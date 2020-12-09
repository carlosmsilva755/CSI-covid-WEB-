#!/bin/bash

set -e

PRIVATE_KEY=$PRIVATE_KEY
eval $(ssh-agent -s)
echo "$PRIVATE_KEY" | tr -d '\r' | ssh-add - > /dev/null

./disableHostKeyChecking.sh


DEPLOY_SERVERS=$DEPLOY_SERVERS

echo "deploying to $DEPLOY_SERVERS"
ssh ubuntu@$DEPLOY_SERVERS 'bash' < ./updateAndRestart.sh
scp -r build/* ubuntu@$DEPLOY_SERVERS:/home/ubuntu/apps/build/
ssh ubuntu@$DEPLOY_SERVERS 'bash' < ./verifyFiles.sh
