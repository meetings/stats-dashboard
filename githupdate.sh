#!/bin/sh

ci_setup() {
    DIR=`dirname $1`
    SCRIPT=`basename $1`
    INTENT=`basename $DIR`
}

ci_upgrade() {
    logger -t ci_upgrade -p local0.info "ci: called"
    cd $DIR
    echo dir: $DIR
    echo script: $SCRIPT
    echo intent: $INTENT
    git clean -f
    git reset --hard
    git pull
    git tag | xargs git tag -d
    git fetch --tags
    logger -t ci_install -p local0.info "git did something"
}

ci_install() {
    true
    logger -t ci_install -p local0.info "pwd at inst: `pwd`"
    cat ${INTENT}.conf > /etc/init/${INTENT}.conf
    # also do something like
    echo git checkout tag and such such
}

ci_restart() {
    true
    # shutdown -r now
    echo service stats restart
    service $INTENT restart
    logger -t ci_install -p local0.info "ci: done."
}
