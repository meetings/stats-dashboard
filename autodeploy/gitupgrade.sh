#!/bin/bash
# gitupgrade.sh, 2013-08-28 / Meetin.gs
#
# Autodeployment script to fetch and update service git repository.
# This script is, of course, run before new version is available,
# thus any new feature is not available.

say() {
    echo " *** $@"
}

git_checkout() {
    # Checkout the branch matching the rank configuration.
    # If it hasn't been checked out before, make sure it
    # is tracked properly.
    #
    git show-ref -q --verify refs/heads/$RANK; EXISTS_LOCAL=$?

    if [ $EXISTS_LOCAL -eq 0 ]; then
        say "Checking out $RANK"
        git checkout $RANK
    else
        say "Creating local tracking branch for $RANK"
        git checkout -b $RANK origin/$RANK
    fi
}

git_upgrade() {
    PREVIOUS=$(git rev-parse HEAD)
    say $PREVIOUS

    # Regardless of current state of the repository,
    # fetch and merge changes.
    #
    git checkout --force master
    git pull --all

    # If there is no remote branch for this machines
    # rank, stay in master and be happy with it.
    #
    git show-ref -q --verify refs/remotes/origin/$RANK; EXISTS_REMOTE=$?

    if [ $EXISTS_REMOTE -ne 0 ]; then
        say "No remote branch $RANK, keeping master"
    else
        git_checkout
    fi

    CURRENT=$(git rev-parse HEAD)
    say $CURRENT

    # Compare previous and current versions. This will
    # set the return value of the function to indicate,
    # if version has changed.
    #
    [ "$PREVIOUS" == "$CURRENT" ]
}
