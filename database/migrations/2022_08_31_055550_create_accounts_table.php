<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Enums\AccountAvailabilityType;
use App\Enums\StatusType;

class CreateAccountsTable extends Migration
{
  private $tableName = 'accounts';
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      if (!Schema::hasTable($this->tableName)) {
        Schema::create($this->tableName, function (Blueprint $table) {
          $table->engine = 'InnoDB';
          $table->uuid('account_id');
          $table->enum('status', StatusType::getKeys())->default(StatusType::PENDING);
          $table->enum('availability', AccountAvailabilityType::getKeys())->default(AccountAvailabilityType::OFFLINE);
          $table->uuid('user_id')->nullable();
          $table->bigIncrements('age');
          $table->timestamps();
          $table->softDeletes();
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
        Schema::dropIfExists('accounts');
    }
}
