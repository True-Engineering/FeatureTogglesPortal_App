FROM nginxinc/nginx-unprivileged:1.23

ARG NGINX_CONF=nginx/nginx.conf
COPY ${NGINX_CONF} /etc/nginx/conf.d/default.conf
COPY out/. /usr/share/nginx/html/
