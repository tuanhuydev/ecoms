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

  public function update(string $accountId, mixed $body)
  {
    if (empty($accountId)) {
      throw new InvalidParamException();
    }
    $account = Account::find($accountId);
    if (empty($account)) {
      return false;
    }
    return $account->update($body);
  }

  public function isCurrentUSerAccount(string $accountId, string $userId) {
    if (empty($accountId) || empty($userId)) {
      throw new InvalidParamException();
    }
    $account = Account::find($accountId);
    return $account->user->id === $userId;
  }
}
