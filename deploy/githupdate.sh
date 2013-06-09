#!/bin/sh

ci_setup() {
    DEPLOY=`dirname $1`
    DIR=`dirname $DEPLOY`
    INTENT=`basename $DIR`
    HOST=`hostname`
    RANK=`awk -vX=$HOST 'BEGIN{split(X,Y,"-");print Y[1]}'`
}

ci_upgrade() {
    cd $DIR

    git checkout master
    git clean -f
    git reset --hard
    git pull
    git tag | xargs git tag -d
    git fetch --tags
}

ci_install() {
    cat $DEPLOY/${INTENT}.conf > /etc/init/${INTENT}.conf
    chmod 644 /etc/init/${INTENT}.conf

    git tag -l | grep -q $RANK

    if [ $? -eq 0 ]; then
        git rev-parse ${RANK}~0 > $DIR/version
        git checkout $RANK
    else
        echo error: cannot find a tag for the hostname
        return 1
    fi
}

ci_restart() {
    service $INTENT restart
}
