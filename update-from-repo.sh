#!/bin/sh

cd $(dirname $0)
git pull 

echo -n '{"rev":"' > rev.js
echo -n "$(git rev-parse HEAD)" >>rev.js
echo -n '"}'>>rev.json


