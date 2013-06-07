#!/usr/bin/env nodejs

var server  = require('./lib/server.js')
var router  = require('./lib/router.js')
var handler = require('./lib/handler.js')

var requests = {}

requests['/']            = handler.root
requests['/pool']        = handler.pool
requests['/favicon.ico'] = handler.favicon

server.start(router.route, requests)
