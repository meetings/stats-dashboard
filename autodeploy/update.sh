#!/bin/bash

. $DEPLOYDIR/gitupgrade.sh

git_upgrade && {
    say "Version has not changed, exiting"
    exit 0
}

npm update
say "Modules updated"

install -m 0644 $DEPLOYDIR/$INTENT.conf /etc/init
git rev-parse HEAD > $THE_VERSION_FILE
say "Current head is at $(cat $THE_VERSION_FILE)"

service stats restart
say "Service restarted"
