<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PersonalAccessClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('oauth_personal_access_clients')->insert([
            'id' => 1,
            'client_id' => '1',
            'created_at' => '2021-07-18 10:34:16',
            'updated_at' => '2021-07-18 10:34:16',
        ]);
    }
}
