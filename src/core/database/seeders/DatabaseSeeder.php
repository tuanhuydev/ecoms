<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Database\Seeders\OauthClientSeeder;
use Database\Seeders\UserSeeder;
use Database\Seeders\PersonalAccessClientSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            OauthClientSeeder::class,
            UserSeeder::class,
            PersonalAccessClientSeeder::class,
        ]);
    }
}
