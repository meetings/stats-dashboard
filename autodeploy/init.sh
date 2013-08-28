#!/bin/bash

npm config set prefix $PREFIX --global
npm install
npm link
