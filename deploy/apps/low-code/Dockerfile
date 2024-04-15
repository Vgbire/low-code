FROM harbor.nova.net.cn/library/nginx:1.18-alpine
LABEL maintainer="MinOY <ouyangmin@nova.net.cn>"

RUN rm -rf /etc/nginx/nginx.conf && rm -rf /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/
COPY default.conf /etc/nginx/conf.d/
COPY . /usr/share/nginx/html/