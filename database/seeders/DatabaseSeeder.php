<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Database\Seeders\OauthClientSeeder;
use Database\Seeders\UserSeeder;
use Database\Seeders\PersonalAccessClientSeeder;
use Database\Seeders\AccountSeeder;

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
        AccountSeeder::class
      ]);
    }
}
