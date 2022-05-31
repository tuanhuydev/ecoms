<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Http\Resources\UserResource;

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
    }
}
