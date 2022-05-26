FROM nginx:stable-alpine

WORKDIR /etc/nginx/conf.d

COPY tools/nginx/default.conf .

WORKDIR /var/www/html

COPY src/core .





