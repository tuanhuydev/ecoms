<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddIndexTasks extends Migration
{
  private $tableName = 'tasks';
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      if (!Schema::hasTable($this->tableName)) {
        Schema::table($this->tableName, function (Blueprint $table) {
          $table->index('id', 'id_index');
          $table->fullText('title', 'task_title_fulltext');
        });
      }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
      Schema::table($this->tableName, function (Blueprint $table) {
        $table->dropIndex('id_index');
        $table->dropFullText('task_title_fulltext');
      });
    }
}
