<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
  private string $table = "categories";
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    DB::table($this->table)->insert(
      [
        [
          'id' => '1',
          'type' => 'task',
          'value' => 'unassigned',
          'created_at' => '2021-07-18 10:34:16',
          'updated_at' => '2021-07-18 10:53:30',
        ],
        [
          'id' => '2',
          'type' => 'task',
          'value' => 'bug',
          'created_at' => '2021-07-18 10:34:16',
          'updated_at' => '2021-07-18 10:53:30',
        ],
        [
          'id' => '3',
          'type' => 'feature',
          'value' => 'unassigned',
          'created_at' => '2021-07-18 10:34:16',
          'updated_at' => '2021-07-18 10:53:30',
        ],
      ]
    );
  }
}
