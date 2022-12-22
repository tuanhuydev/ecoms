<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCategoriesTable extends Migration
{
    private string $tableName = "categories";
    private string $taskTableName = "tasks";
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      if (!Schema::hasTable($this->tableName)) {
        Schema::create($this->tableName, function (Blueprint $table) {
          $table->id();
          $table->string('type');
          $table->string('value');
          $table->timestamps();
          $table->softDeletes();
        });
      }
      // Create relationship in Task
      if (Schema::hasTable($this->taskTableName)) {
        Schema::table($this->taskTableName, function(Blueprint $table) {
          $table->unsignedBigInteger('category_id')->nullable();
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
        Schema::dropIfExists('categories');
        Schema::table($this->taskTableName, function(Blueprint $table) {
          $table->removeColumn('category_id');
        });
    }
}
