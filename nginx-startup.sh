#!/bin/bash

set -e

if [ ! -z "$SAFE_BROWSING" ]; then
    sed -i "s/1.1.1.1/1.1.1.3/" /etc/nginx/nginx.conf
fi

nginx