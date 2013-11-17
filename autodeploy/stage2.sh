#!/bin/bash
# stage2.sh, 2013-11-17 / Meetin.gs
#
# Autodeployment script to ensure update is allowed
# to happen by acquiring a predefined lock file.

LOCKWAIT=4
PERMUSER=nobody
PERMGROUP=nogroup

acquire_lock() {
    LOCKDIR=$(dirname $LOCKFILE)

    if [ ! -e $LOCKDIR ]; then
        mkdir -vp $LOCKDIR
        chown -c $PERMUSER:$PERMGROUP $LOCKDIR
        echo " *** stage2: Created a directory for lockfile"
    fi

    # Create lock and wait is someone removes it.
    #
    touch $LOCKFILE
    sleep $LOCKWAIT

    # Do not continue, until lockfile has been acquired.
    #
    while [ ! -f $LOCKFILE ]; do
        touch $LOCKFILE
        sleep $LOCKWAIT
    done
}

release_lock() {
    rm -f $LOCKFILE
}
