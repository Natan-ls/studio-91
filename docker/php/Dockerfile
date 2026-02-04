FROM php:8.2-fpm-alpine

# Instala dependências do sistema e extensões do PHP para Postgres
RUN set -ex \
  && apk --no-cache add postgresql-dev \
  && docker-php-ext-install pdo pdo_pgsql