#!/usr/bin/env bash
set -e

# Update test fixtures for Lumiplan resorts
# Uses the bin/fetch command to download fresh HTML from bulletinv3.lumiplan.pro

RESORTS=(
  "laplagne"
  "megeve"
  "tignes"
  "lesarcs"
  "courchevel"
  "lesmenuires"
  "meribel"
)

echo "Updating Lumiplan resort fixtures..."

for resort in "${RESORTS[@]}"; do
  echo "Fetching $resort..."
  node bin/fetch "$resort"
done

echo "Done! All Lumiplan fixtures updated."