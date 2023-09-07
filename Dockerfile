FROM node:16.20-alpine3.17 as build

RUN mkdir /src/
COPY . /src/
WORKDIR /src/

WORKDIR /src/packages/Open_TE_FeatureTogglesPortal_UI
RUN yarn && yarn build && rm -rf node_modules

WORKDIR /src/packages/Open_TE_FeatureTogglesPortal_TE_Theme
RUN yarn && yarn build && rm -rf node_modules

WORKDIR /src
RUN yarn && yarn build


FROM nginxinc/nginx-unprivileged:1.23

ARG NGINX_CONF=nginx/nginx.conf
COPY ${NGINX_CONF} /etc/nginx/conf.d/default.conf
COPY --from=build /src/out/. /usr/share/nginx/html/
