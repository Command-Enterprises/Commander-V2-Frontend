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

RUN chmod +x sed.sh && sh sed.sh

FROM nginx:stable-bookworm

ENV PORT=80

ENV SAFE_BROWSING=1

COPY --from=builder /opt/commander /opt/commander

RUN cp /opt/commander/nginx.conf /etc/nginx/nginx.conf

RUN nginx -t

CMD chmod +x /opt/commander/entrypoint.sh && sh /opt/commander/entrypoint.sh