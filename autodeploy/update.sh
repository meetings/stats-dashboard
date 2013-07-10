#!/bin/bash

DEPLOYDIR=autodeploy

git checkout master
git clean -f
git reset --hard HEAD
git pull
git tag | xargs git tag -d
git fetch --tags

npm update

. $DEPLOYDIR/common

activate_and_start

exit 0
