"""Image generation через fal.ai (Flux model).

В dev/mock-режиме возвращает picsum placeholder вместо реального вызова.
В production использует fal_client (тот же что в Sofia).

Setup: FAL_KEY="key:secret" в .env
"""
from __future__ import annotations

import asyncio
import logging
import os
import random
from typing import Any, Optional

import httpx

logger = logging.getLogger(__name__)

# Дефолтная модель — Flux dev (хороший quality/price tradeoff)
DEFAULT_MODEL = os.getenv("FAL_IMAGE_MODEL", "fal-ai/flux/dev")
DEFAULT_IMAGE_SIZE = "landscape_16_9"  # 1280×720 — стандартный display ads


def is_configured() -> bool:
    key = os.getenv("FAL_KEY", "").strip()
    if not key or len(key) < 10:
        return False
    if key.startswith("your_") or key.endswith("..."):
        return False
    return True


async def generate_image(
    prompt: str,
    *,
    model: Optional[str] = None,
    image_size: str = DEFAULT_IMAGE_SIZE,
    num_images: int = 1,
) -> dict[str, Any]:
    """Сгенерить картинку. Возвращает {success, urls, prompt, mock}."""
    if not is_configured():
        return _mock_generate(prompt, num_images)

    api_key = os.getenv("FAL_KEY", "")
    use_model = model or DEFAULT_MODEL

    try:
        async with httpx.AsyncClient(timeout=60.0) as client:
            r = await client.post(
                f"https://queue.fal.run/{use_model}",
                headers={"Authorization": f"Key {api_key}", "Content-Type": "application/json"},
                json={
                    "prompt": prompt,
                    "image_size": image_size,
                    "num_images": num_images,
                    "enable_safety_checker": True,
                },
            )
            if r.status_code >= 400:
                logger.error("fal.ai error %s: %s", r.status_code, r.text[:300])
                return {"success": False, "message": f"fal.ai {r.status_code}", "mock": False}

            data = r.json()
            # Async queue → нужно poll status URL
            status_url = data.get("status_url") or data.get("response_url")
            if not status_url:
                # Direct synchronous response
                imgs = [i.get("url") for i in (data.get("images") or [])]
                return {"success": True, "urls": imgs, "prompt": prompt, "mock": False}

            # Poll до 60 секунд
            for _ in range(20):
                await asyncio.sleep(3)
                s = await client.get(status_url, headers={"Authorization": f"Key {api_key}"})
                sd = s.json()
                if sd.get("status") == "COMPLETED":
                    res = await client.get(data["response_url"], headers={"Authorization": f"Key {api_key}"})
                    final = res.json()
                    imgs = [i.get("url") for i in (final.get("images") or [])]
                    return {"success": True, "urls": imgs, "prompt": prompt, "mock": False}
                if sd.get("status") in ("FAILED", "ERROR"):
                    return {"success": False, "message": "fal.ai generation failed", "mock": False}

            return {"success": False, "message": "fal.ai timeout (60s)", "mock": False}

    except Exception as e:
        logger.exception("Failed image generation")
        return {"success": False, "message": str(e), "mock": False}


def _mock_generate(prompt: str, num_images: int) -> dict[str, Any]:
    """В mock-режиме возвращаем picsum placeholders с детерминированным сидом."""
    seed = abs(hash(prompt)) % 1000
    urls = [
        f"https://picsum.photos/seed/{seed + i}/1280/720"
        for i in range(num_images)
    ]
    logger.info("[MOCK] image_gen prompt='%s' → %d placeholder urls", prompt[:60], num_images)
    return {
        "success": True,
        "urls": urls,
        "prompt": prompt,
        "mock": True,
        "note": "FAL_KEY not configured — placeholder images from picsum.photos",
    }
