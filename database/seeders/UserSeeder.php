<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'id' => 'd27a49d2-ba18-40ea-9298-9c4e4979a3e8',
            'first_name' => 'Huy',
            'last_name' => 'Nguyen Tuan',
            'email' => 'tuanhuydev@gmail.com',
            'password' => '$2y$10$x4i9Z85iG4cUj38Zgx729eMHk3wtZwRNfAJEBmSaHRwJiLPA4EtIm', // 123456789
            'confirmation_token'=> '1',
            'created_at' => '2021-07-18 10:34:16',
            'email_verified_at' => '2021-07-18 10:34:16',
            'updated_at' => '2021-07-18 10:53:30',
        ]);
    }
}
