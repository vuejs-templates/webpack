#!/usr/bin/env bash

set -e

cd tests

for f in *.sh; do
  filename=$(basename "$f")
  testname="${filename%.*}"

  source "$f" "$testname"
done

cd ..


