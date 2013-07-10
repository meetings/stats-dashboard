
stats
=====

Statistics for [Meetin.gs](http://meetin.gs/about).

Installation
------------

Manual installation instructions follow.

1. Configure *npm*(1), install dependencies and make *stats* available.
```
# npm config set prefix /usr/local --global
# npm install
# npm link
```

2. Copy *Upstart* configuration in place.
```
# install -m 0644 autodeploy/stats.conf /etc/init
```

3. Initialize version file.
```
# git rev-parse <ref> > /etc/the_service_version
```

4. Start service.
```
# service stats start
```
