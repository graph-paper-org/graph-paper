#!/usr/bin/env bash

# adapted from https://github.com/hperrin/svelte-material-ui/blob/master/package-sh.sh

for dir in packages/*; do
  if [ "$dir" != "packages/core" ]; then
    cd "$dir" || exit 1
    "$@"
    cd ../..
  fi
done