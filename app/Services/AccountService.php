<?php

namespace App\Services;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;
use App\Exceptions\InvalidParamException;
use App\Enums\StatusType;
use App\Enums\AccountAvailabilityType;
use App\Models\Account;

class AccountService
{
  public function create(string $userId)
  {
    if (empty($userId)) {
      throw new InvalidParamException();
    }
    $account = [
      "user_id" => $userId,
      "status" => StatusType::PENDING,
      "availability" => AccountAvailabilityType::OFFLINE,
      "age" => 0,
    ];
    return Account::create($account);
  }
}
