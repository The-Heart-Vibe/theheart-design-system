#!/usr/bin/env bash
# Copies The Heart office photos from the original source folder into
# src/assets/office/ with semantic filenames matching office-catalog.ts.
#
# Run once from the repo root:
#   bash scripts/copy-office-photos.sh
#
# Then commit:
#   git add src/assets/office && git commit -m "feat: add office photo assets"

set -euo pipefail

SRC="${HOME}/The Heart zm"
DST="$(cd "$(dirname "$0")/.." && pwd)/src/assets/office"

if [[ ! -d "$SRC" ]]; then
  echo "ERROR: Source folder not found: $SRC"
  exit 1
fi

mkdir -p "$DST"

declare -A MAP=(
  ["The Heart zm (1).jpg"]="reception-desk.jpg"
  ["The Heart zm (2).jpg"]="reception-corridor.jpg"
  ["The Heart zm (3).jpg"]="kitchenette.jpg"
  ["The Heart zm (4).jpg"]="meeting-room-plane.jpg"
  ["The Heart zm (5).jpg"]="do-something-great.jpg"
  ["The Heart zm (6).jpg"]="open-office-pods.jpg"
  ["The Heart zm (7).jpg"]="open-office-corridor.jpg"
  ["The Heart zm (8).jpg"]="heartcore-team-lounge.jpg"
  ["The Heart zm (9).jpg"]="kitchen-bar-neon.jpg"
  ["The Heart zm (10).jpg"]="focus-pods-1.jpg"
  ["The Heart zm (11).jpg"]="focus-pods-2.jpg"
  ["The Heart zm (12).jpg"]="kitchen-bar-slats.jpg"
  ["The Heart zm (13).jpg"]="lounge-neon-city.jpg"
  ["The Heart zm (14).jpg"]="lounge-night-city.jpg"
  ["The Heart zm (15).jpg"]="bubble-game-room.jpg"
)

copied=0
for src_name in "${!MAP[@]}"; do
  dst_name="${MAP[$src_name]}"
  if [[ -f "$SRC/$src_name" ]]; then
    cp "$SRC/$src_name" "$DST/$dst_name"
    echo "  $src_name  ->  $dst_name"
    ((copied++))
  else
    echo "  NOT FOUND: $SRC/$src_name"
  fi
done

echo ""
echo "Done. $copied / ${#MAP[@]} photos copied to $DST"
echo ""
echo "Next step:"
echo "  git add src/assets/office && git commit -m 'feat: add office photo assets'"
