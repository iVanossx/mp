#!/bin/sh

cd $(dirname $0)
git pull 

echo -n 'var system_version="' > rev.js
echo -n "$(stat -c %y .git/refs/heads/master), $(git rev-parse HEAD)" >>rev.js
echo -n '";'>>rev.js


