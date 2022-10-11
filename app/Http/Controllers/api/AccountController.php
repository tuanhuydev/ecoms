<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use BenSampo\Enum\Rules\EnumValue;
use App\Http\Traits\TransformArrayTrait;
use App\Enums\StatusType;
use App\Services\AccountService;
use App\Enums\AccountAvailabilityType;
use App\Models\User;
use App\Models\Account;

use Throwable;
class AccountController extends Controller
{
    use TransformArrayTrait;
    private AccountService $accountService;
    function __construct(AccountService $accountService)
    {
        $this->accountService = $accountService;
    }
  /**
   * Update account
   *
   * @param Request $request
   * @return JsonResponse
   */
  public function updateAccount(Request $request): \Illuminate\Http\JsonResponse
  {
    if (empty($request->id)) {
      throw new InvalidParamException();
    }
    $validatedData = $request->validate([
      'user_id' => 'nullable',
      'status' => ['nullable', new EnumValue(StatusType::class)],
      'availability' => ['nullable', new EnumValue(AccountAvailabilityType::class)],
      'age' => 'nullable',
    ]);

    return response()->json([
      'success' => $this->accountService->update($request->id, $this->toSnake($validatedData)),
      'current' => $this->accountService->isCurrentUSerAccount($request->id, $request->user()->id)
    ]);
  }
}
