
stats
=====

Statistics for [Meetin.gs](http://meetin.gs/about).

Installation
------------

1. Configure *npm*(1).
```
# npm config set prefix /usr/local --global
```

2. Install dependencies and link *stats* to your *$PATH*.
```
# npm install
# npm link
```

3. Copy *Upstart* configuration in place.
```
# cp deploy/stats.conf /etc/init
# chmod 644 /etc/init/stats.conf
```

4. Initialize version file.
```
# git rev-parse <ref> > /etc/the_service_version
```

5. Start service.
```
# service stats start
```
