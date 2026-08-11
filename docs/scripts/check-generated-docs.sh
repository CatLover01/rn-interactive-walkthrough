#!/usr/bin/env bash

set -e

npm run build

if ! git diff --quiet -- docs/api-reference; then
  echo
  echo "ERROR: Generated TypeDoc documentation is out of date."
  echo "Run 'npm run build' and commit the generated changes."
  git diff --stat -- docs/api-reference
  echo
  exit 1
fi
