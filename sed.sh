#!/bin/sh

set -e

sed -i $"s/proxy_set_header Accept-Encoding/proxy_set_header x-request-id '';\
proxy_set_header x-forwarded-for '';\
proxy_set_header x-forwarded-proto '';\
proxy_set_header x-forwarded-port '';\
proxy_set_header via '';\
proxy_set_header connect-time '';\
proxy_set_header x-request-start '';\
proxy_set_header total-route-time '';\
proxy_set_header Accept-Encoding/" nginx.conf

sed -i "s/binary_remote_addr/http_x_forwarded_for/g" nginx.conf

sed -i 's/http {/http {access_log \/dev\/stdout; error_log stderr;/' nginx.conf

sed -i '1i daemon off;' nginx.conf