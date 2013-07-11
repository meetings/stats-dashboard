#!/bin/bash

npm config set prefix $PREFIX --global
npm install
npm link

. $DEPLOYDIR/common.sh

activate_and_start

exit 0
