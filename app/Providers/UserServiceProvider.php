<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\api\UserController;
use App\Services\UserService;
use App\Services\AccountService;
use App\Services\EmailService;

class UserServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(AuthController::class, function ($app) {
            return new AuthController($app->make(UserService::class));
        });

        $this->app->singleton(UserController::class, function($app) {
            return new UserController($app->make(UserService::class));
        });

        $this->app->singleton(UserService::class, function($app) {
          return new UserService($app->make(AccountService::class));
        });
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
