#!/bin/bash

git clean -f
git reset --hard HEAD
git checkout master
git pull
git tag | xargs git tag -d
git fetch --tags

npm update

. $DEPLOYDIR/common.sh

activate_and_start

exit 0
