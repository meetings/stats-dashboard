
function say() {
    echo " *** $@"
}

function git_update_branch() {
    git fetch origin

    git show-ref -q --verify refs/remotes/origin/$RANK; EXISTS_REMOTE=$?

    if [ $EXISTS_REMOTE -ne 0 ]; then
        say No remote branch $RANK, keeping master
        git checkout master
        git reset --hard
        return
    fi

    git show-ref -q --verify refs/heads/$RANK; EXISTS_LOCAL=$?

    if [ $EXISTS_LOCAL -ne 0 ]; then
        say Checking out $RANK
        git checkout -b $RANK origin/$RANK
        return
    fi

    say Reseting current head
    git reset --hard
}

function npm_init() {
    npm config set prefix $PREFIX --global
    npm install
    npm link
}

function npm_update() {
    npm update
}

function service_activate() {
    install -m 0644 $DEPLOYDIR/$INTENT.conf /etc/init

    git rev-parse HEAD > $THE_VERSION_FILE

    say Current head is at $(cat $THE_VERSION_FILE)

    service stats restart && say Service restarted
}
