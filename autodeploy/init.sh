#!/bin/sh
# init.sh, 2013-11-17 / Meetin.gs
#
# Autodeployment (version 2) init hook for
# generic Node.js service initialization.

set -u

echo " *** init: Initializing npm config and modules"
npm config set prefix $PREFIX --global
npm install 2> /dev/null
npm link

echo " *** init: Setting up service configuration"
install -m 0644 $DEPLOYDIR/$INTENT.conf /etc/init

echo " *** init: Starting servive"
service $INTENT start
