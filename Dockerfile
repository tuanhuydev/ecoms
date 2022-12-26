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

# Copy custom setup for php
COPY ./php.ini /usr/local/etc/php

# Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install node dependencies
RUN npm install -g yarn

# Setup working directory
WORKDIR /var/www/html

# Install project dependencies
COPY --chown=www-data:www-data package.json yarn.lock ./

RUN yarn install

# Copy source code
COPY --chown=www-data:www-data . .

# Build App
RUN yarn build
