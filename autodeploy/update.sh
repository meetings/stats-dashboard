#!/bin/bash
# update.sh, 2013-11-17 / Meetin.gs
#
# Autodeployment (version 2) update hook for
# generic Node.js service upgrading.

set -u

tell() {
    echo " *** update: $@"
}

. $DEPLOYDIR/stage1.sh

git_upgrade && {
    tell Version has not changed, exiting
    exit 0
}

. $DEPLOYDIR/stage2.sh

acquire_lock && {
    tell Lock acquired, trying to update
    npm update 2> /dev/null

    tell Installing service configuration
    install -m 0644 -p $DEPLOYDIR/$INTENT.conf /etc/init/

    tell Updating version
    git rev-parse HEAD | tee $VERSIONFILE

    tell Restarting service
    service $INTENT restart

    release_lock || true
}
