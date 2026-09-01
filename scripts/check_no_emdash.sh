#!/usr/bin/env bash
# check_no_emdash.sh — blocks a NEW em-dash from entering src/.
#
# Written 2026-08-31, after I put two em-dashes into src/app/b6/page.tsx while writing a comment
# about removing prices that should not have been on the page. The rule "no em-dashes in src/"
# has been in the briefing since day one and existed nowhere in this repo's code: saasflywheel,
# agentsexplained and aitakescare each carry a check_no_emdash.sh, kampaio had none. The
# pre-commit hook here lints staged BLOG pages only, so a file outside src/app/blog was checked
# by nobody. The weekly audit found it four hours later.
#
# Why staged files and not all of src/, which is what the siblings scan: this corpus already
# holds em-dashes in 44 files, most of them B6 app components and API routes written long before
# the rule. A whole-tree scan would fail every commit and be switched off within a day. Checking
# what is being committed blocks the next one without demanding a 44-file cleanup first — and it
# is the version that would have stopped me today.
set -euo pipefail

EMDASH=$(printf '\xe2\x80\x94')

staged=$(git diff --cached --name-only --diff-filter=AM \
  | grep -E '^src/.*\.(tsx|ts|css|mdx)$' \
  || true)

[ -z "$staged" ] && exit 0

hits=""
while IFS= read -r f; do
  [ -f "$f" ] || continue
  # Only lines this commit ADDS. An untouched em-dash elsewhere in the file is not this
  # commit's doing and blocking on it would punish the wrong change.
  added=$(git diff --cached -U0 -- "$f" | grep '^+' | grep -v '^+++' | grep "$EMDASH" || true)
  [ -n "$added" ] && hits="${hits}${f}:\n${added}\n"
done <<< "$staged"

if [ -n "$hits" ]; then
  echo "ERROR: this commit adds an em-dash to src/. Replace with a comma, colon or period." >&2
  printf "%b" "$hits" >&2
  exit 1
fi

exit 0
