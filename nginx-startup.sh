#!/bin/bash

if systemctl --quiet is-active nginx; then
    echo "Nginx is currently running. Restarting the service..."
    systemctl restart nginx
else
    echo "Nginx is not currently running. Starting the service..."
    systemctl start nginx
fi