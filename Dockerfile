# Modded from https://github.com/binary-person/womginx/blob/master/Dockerfile
FROM node:20-bookworm as builder

RUN apt -y install git
COPY . /opt/commander

WORKDIR /opt/commander

RUN rm -rf .git && git init
WORKDIR /opt/commander/public
RUN rm -rf wombat && git submodule add https://github.com/webrecorder/wombat
WORKDIR /opt/commander/public/wombat

RUN git checkout 78813ad

RUN npm install --legacy-peer-deps && npm run build-prod

RUN mv dist .. && rm -rf * .git && mv ../dist/ .

WORKDIR /opt/commander

FROM nginx:stable-bookworm

ENV PORT=80

COPY --from=builder /opt/commander /opt/commander

RUN rm /etc/nginx/conf.d/default.conf && cp /opt/commander/nginx.conf /etc/nginx/nginx.conf

RUN nginx -t

CMD sed -i -e "s/listen 80/listen $PORT/" /etc/nginx/nginx.conf &&\
    [[ ! -z "$SAFE_BROWSING" ]] && sed -i -e "s/1.1.1.1/1.1.1.3/" /etc/nginx/nginx.conf || true &&\
    nginx