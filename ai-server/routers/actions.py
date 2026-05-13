"""HTTP endpoints для approval-flow proposed actions.

Day 2:
- GET  /api/actions?status=proposed — список действий
- GET  /api/actions/{action_id} — деталь действия
- POST /api/actions/{action_id}/approve — апрув + (dry-run) применение
- POST /api/actions/{action_id}/reject — отклонить
"""
from __future__ import annotations

import logging
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel

from db.models import User
from dependencies import get_current_user
from services import audit, google_ads_client as gads

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/actions", tags=["actions"])


class ApproveRequest(BaseModel):
    apply_to_google_ads: bool = False  # Day 2 default: dry_run


class RejectRequest(BaseModel):
    reason: Optional[str] = None


def _assert_owner(action: dict, user_id: str) -> None:
    """Return 404 (not 403) if user doesn't own — avoid leaking action existence."""
    if action.get("user_id") != user_id:
        raise HTTPException(404, f"Action not found")


@router.get("")
async def list_actions_endpoint(
    status: Optional[str] = Query(None, description="Filter: proposed | approved | applied | rejected"),
    limit: int = Query(50, ge=1, le=500),
    current_user: User = Depends(get_current_user),
):
    """Список действий текущего пользователя."""
    items = await audit.list_actions(user_id=current_user.id, status=status, limit=limit)
    return {"user_id": current_user.id, "status_filter": status, "count": len(items), "actions": items}


@router.get("/{action_id}")
async def get_action_endpoint(action_id: str, current_user: User = Depends(get_current_user)):
    """Деталь одного действия (включает risk_review от Aegis)."""
    item = await audit.get_action(action_id)
    if item is None:
        raise HTTPException(404, f"Action {action_id} not found")
    _assert_owner(item, current_user.id)
    review = await audit.get_risk_review(action_id)
    item["risk_review"] = review
    return item


@router.get("/{action_id}/review")
async def get_action_review(action_id: str, current_user: User = Depends(get_current_user)):
    """Только risk-review от Aegis для конкретного action."""
    item = await audit.get_action(action_id)
    if item is None:
        raise HTTPException(404, f"Action {action_id} not found")
    _assert_owner(item, current_user.id)
    review = await audit.get_risk_review(action_id)
    if review is None:
        raise HTTPException(404, f"No review found for {action_id}")
    return review


@router.post("/{action_id}/approve")
async def approve_action(action_id: str, body: ApproveRequest, current_user: User = Depends(get_current_user)):
    """Апрувнуть действие.

    Если apply_to_google_ads=True — сразу выполняем через google_ads_client.
    Day 2 по умолчанию dry-run (статус становится 'approved' + 'applied' но в Google Ads ничего не уходит).
    """
    action = await audit.get_action(action_id)
    if action is None:
        raise HTTPException(404, f"Action {action_id} not found")
    _assert_owner(action, current_user.id)
    if action["status"] not in ("proposed", "pending_approval"):
        raise HTTPException(400, f"Action is in status '{action['status']}' — cannot approve")

    target = action["target"] or {}
    approver_id = current_user.id

    # Mark approved
    await audit.update_action_status(
        action_id, "approved", approved_by_user_id=approver_id
    )

    # Apply (dry-run для Day 2)
    after_state = None
    try:
        if action["action_type"] == "update_bid":
            after_state = await gads.update_bid(
                access_token="dev-token",
                customer_id=target.get("customer_id"),
                ad_group_criterion_resource=f"campaign_{target.get('campaign_id')}",
                new_bid_micros=int(target.get("new_bid_micros", 0)),
                dry_run=not body.apply_to_google_ads,
            )
        elif action["action_type"] == "pause_campaign":
            after_state = await gads.pause_campaign(
                access_token="dev-token",
                customer_id=target.get("customer_id"),
                campaign_id=target.get("campaign_id"),
                dry_run=not body.apply_to_google_ads,
            )
        else:
            after_state = {"warning": f"Unknown action_type {action['action_type']} — only marked approved"}
    except NotImplementedError as e:
        # Production write tools пока не реализованы (нужен real token)
        after_state = {"dry_run": True, "note": str(e)}

    result = await audit.update_action_status(
        action_id, "applied", approved_by_user_id=approver_id, after_state=after_state
    )
    return {"status": "applied", "action_id": action_id, "after_state": after_state, **(result or {})}


@router.post("/{action_id}/reject")
async def reject_action(action_id: str, body: RejectRequest, current_user: User = Depends(get_current_user)):
    """Отклонить действие."""
    action = await audit.get_action(action_id)
    if action is None:
        raise HTTPException(404, f"Action {action_id} not found")
    _assert_owner(action, current_user.id)
    if action["status"] not in ("proposed", "pending_approval"):
        raise HTTPException(400, f"Action is in status '{action['status']}' — cannot reject")

    result = await audit.update_action_status(
        action_id, "rejected", approved_by_user_id=current_user.id,
        after_state={"rejection_reason": body.reason} if body.reason else None,
    )
    return {"status": "rejected", "action_id": action_id, **(result or {})}
