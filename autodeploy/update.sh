#!/bin/bash

. $DEPLOYDIR/common.sh

git_update_branch
npm_update
service_activate

exit 0
