<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\api\UserController;
use App\Services\UserService;
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
            return new AuthController(new UserService());
        });

        $this->app->singleton(UserController::class, function($app) {
            return new UserController(new UserService());
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
