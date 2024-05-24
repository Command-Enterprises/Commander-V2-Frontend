#!/bin/sh

set -e

sed -i "s/listen 80/listen $PORT/" /etc/nginx/nginx.conf

if [ ! -z "$SAFE_BROWSING" ]; then
    sed -i "s/1.1.1.1/1.1.1.3/" /etc/nginx/nginx.conf
fi

rm /etc/nginx/conf.d/default.conf

nginx