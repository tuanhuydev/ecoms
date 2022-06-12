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

# Setup working directory
WORKDIR /var/www

# Install project dependencies
COPY src/core/package.json src/core/yarn.lock ./

RUN yarn install

# Copy source code
COPY src/core ./

# Allow permission for whole app
RUN chown -R www-data:www-data /var/www

