#!/bin/sh

ci_setup() {
    DEPLOY=`dirname $1`
    DIR=`dirname $DEPLOY`
    INTENT=`basename $DIR`
    logger -t ci_upgrade -p local0.info "ci DIR: $DIR"
}

ci_upgrade() {
    logger -t ci_upgrade -p local0.info "ci: called"
    cd $DIR
    echo dir: $DIR
    echo intent: $INTENT
    git clean -f
    git reset --hard
    git pull
    git tag | xargs git tag -d
    git fetch --tags
    echo git did something
}

ci_install() {
    logger -t ci_install -p local0.info "pwd at inst: `pwd`"
    cat $DEPLOY/${INTENT}.conf > /etc/init/${INTENT}.conf
    chmod 644 /etc/init/${INTENT}.conf
    # also do something like
    echo git checkout tag and such such
}

ci_restart() {
    echo restarting...
    service $INTENT restart
    logger -t ci_install -p local0.info "ci: done."
}
