FROM php:8.0-fpm

#Install Images dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    iputils-ping \
    npm \
    zip \
    vim \
    unzip

# PHP OOP extension
RUN docker-php-ext-install pdo pdo_mysql

# Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install node dependencies
RUN npm install -g yarn webpack webpack-cli

# create user group with
# RUN addgroup -gid 1001 -system appgroup

# create user with id
# RUN adduser -system appuser -u 1001

# switch to appuser to run the app
# RUN chown -R appuser:appgroup /var/www

WORKDIR /var/www

# Copy source code
COPY src/core ./

RUN chown -R www-data:www-data /var/www

# USER appuser


RUN yarn install
