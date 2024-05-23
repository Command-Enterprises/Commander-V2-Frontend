FROM ubuntu:latest

COPY . /opt/commander

WORKDIR /opt/commander

RUN apt-get -y update && \
    apt-get install -y git && \
    rm -rf .git && git init

WORKDIR /opt/commander/public

RUN rm -rf wombat && git submodule add https://github.com/webrecorder/wombat

WORKDIR /opt/commander/public/wombat

RUN git checkout 78813ad

RUN apt-get -y update && \
    apt-get -y install nodejs && \
    npm i --legacy-peer-deps && npm run build-prod

RUN mv dist .. && rm -rf * .git && mv ../dist/ .

WORKDIR /opt/commander

RUN apt-get -y update && \
    apt-get -y install nginx && \
    cp -f nginx.conf /etc/nginx/nginx.conf

CMD chmod +x nginx-startup.sh && bash nginx-startup.sh