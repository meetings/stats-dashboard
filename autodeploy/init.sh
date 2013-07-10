#!/bin/bash

PREFIX=/usr/local
DEPLOYDIR=autodeploy

. $DEPLOYDIR/common

npm config set prefix $PREFIX --global
npm install
npm link

install -m 0644 $DEPLOYDIR/$INTENT.conf /etc/init

activate_and_start

exit 0
