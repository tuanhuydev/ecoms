<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class OauthClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('oauth_clients')->insert([
            'id' => 1,
            'user_id' => '',
            'name' => 'HuyNT Personal Access Client',
            'secret' => 'I5jUgYS4b4RL53VwsTGyHUG86CgbzZnYr3no5bbG',
            'provider' => '',
            'redirect' => 'http://localhost',
            'personal_access_client' => 1,
            'password_client' => 0,
            'revoked' => 0,
            'created_at' => '2021-07-18 10:34:16',
            'updated_at' => '2021-07-18 10:34:16',
        ]);
    }
}
