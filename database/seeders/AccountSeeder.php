<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class AccountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      DB::table('accounts')->insert([
        'account_id' => 'c2b9ebf7-28e3-417d-abf3-9ac07231ae32',
        'status' => 'ACTIVE',
        'availability' => 'OFFLINE',
        'user_id' => 'd27a49d2-ba18-40ea-9298-9c4e4979a3e8',
        'age' => 1,
        'created_at' => '2021-07-18 10:34:16',
        'updated_at' => '2021-07-18 10:53:30',
      ]);
    }
}
