<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Enums\SeverityType;


class AddAcceptanceSeverityUpdatedByToTask extends Migration
{
  private string $tableName = "tasks";
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    if (Schema::hasTable($this->tableName)) {
      Schema::table($this->tableName, function (Blueprint $table) {
          $table->uuid('created_by')->nullable();
          $table->string('acceptance')->nullable();
          $table->enum('severity', SeverityType::getKeys())->default(SeverityType::MEDIUM);
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
      if (Schema::hasTable($this->tableName)) {
        Schema::table($this->tableName, function (Blueprint $table) {
            $table->dropColumn('created_by');
            $table->dropColumn('acceptance');
            $table->dropColumn('severity');
        });
      }
    }
}
