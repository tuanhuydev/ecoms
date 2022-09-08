<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Http\Resources\UserResource;
use App\Http\Resources\TaskResource;
use App\Http\Resources\AccountResource;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // remove wrap data with data attributes
        UserResource::withoutWrapping();
        TaskResource::withoutWrapping();
        AccountResource::withoutWrapping();
    }
}
