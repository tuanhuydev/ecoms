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

WORKDIR /var/www/html

COPY src/core/package.json src/core/package-lock.json ./

# Install node dependencies
RUN npm install

# Copy source code
COPY src/core ./

# TODO: Create system user to run Composer and Artisan Commands
# RUN useradd -G www-data,root -u 1000 -d /home/sidehand sidehand
# RUN mkdir -p /home/sidehand/.composer && \
#     chown -R sidehand:sidehand /home/sidehand 

# USER sidehand

