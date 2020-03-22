#!/bin/sh

cd $(dirname $0)
git pull 

echo -n '{"rev":"' > rev.json
echo -n "$(git rev-parse HEAD)" >>rev.json
echo -n '"}'>>rev.json


