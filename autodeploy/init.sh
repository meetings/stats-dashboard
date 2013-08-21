#!/bin/bash

. $DEPLOYDIR/common.sh

git_update_branch
npm_init
service_activate

exit 0
