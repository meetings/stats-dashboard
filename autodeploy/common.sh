
function activate_and_start() {
    install -m 0644 $DEPLOYDIR/$INTENT.conf /etc/init

    git tag -l | grep -q $RANK

    if [ $? -eq 0 ]; then
        git rev-parse $RANK~0 > $THE_VERSION_FILE
        git checkout $RANK

        initctl emit --no-wait theservicestart
    else
        echo error: cannot find a tag for the rank
        echo error: the service is not active
        exit 1
    fi
}
