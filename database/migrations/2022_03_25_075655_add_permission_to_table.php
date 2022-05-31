<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Enums\PermissionType;

class AddPermissionToTable extends Migration
{
    private string $tableName = "users";
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (Schema::hasTable($this->tableName)) {
            Schema::table($this->tableName, function (Blueprint $table) {
                $table->enum('permission', PermissionType::getKeys())->default(PermissionType::GUEST);
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
                $table->dropColumn('permission');
            });
        }
    }
}
