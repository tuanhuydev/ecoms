<?php

namespace App\Services;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Account;
use Illuminate\Support\Str;
use App\Exceptions\UnauthorizedException;
use App\Exceptions\NotFoundException;
use App\Exceptions\InvalidParamException;
use Illuminate\Support\Facades\Mail;
use App\Mail\SignUpConfirm;
use App\Mail\ForgotPassword;
use Carbon\Carbon;
use App\Enums\StatusType;
use App\Enums\AccountAvailabilityType;
use App\Services\AccountService;
use Illuminate\Support\Facades\DB;

class UserService
{
  private AccountService $accountService;

  function __construct(AccountService $accountService)
  {
    $this->accountService = $accountService;
  }
    /**
     * Authenticate user using email and password
     * -> Check user's existence
     * -> Compare user's hashed password
     * -> Generate access token and return
     *
     * @param string $email
     * @param string $password
     */
    function signIn(string $email, string $password): array
    {
      return DB::transaction(function() use($email, $password) {
        // Check auth user
        if (!Auth::attempt(['email' => $email, 'password' => $password])) {
            throw new UnauthorizedException();
        }

        $user = Auth::user();
        $userAccount = Account::with('user')->where('user_id', $user->id)->first();

        // Check user's account abilities
        if (!$userAccount || (isset($userAccount) && $userAccount->status !== StatusType::ACTIVE)) {
          throw new UnauthorizedException();
        }
        // User should be available on signing in
        $userAccount->availability = AccountAvailabilityType::AVAILABLE;
        $userAccount->save();

        $accessToken = $user->createToken('authToken')->accessToken;
        return ['user' => $userAccount, 'access_token' => $accessToken];
      });
    }

    /**
     * Create new user
     *  -> Hash password
     *  -> Create new user
     *  -> Send confirmation email
     *
     * @param mixed body
     * @return User
     */
    function signUp(mixed $body): User {
        $body['password'] = bcrypt($body['password']);
        $user = User::create($body);

        Mail::to($user->email)->send(new SignUpConfirm($user));

        return $user;
    }

    function getUserInfo(int $userId): User
    {
        return User::find($userId);
    }

  /**
   * Verify account
   * -> Check user
   * -> Check confirmation_token field value
   * -> update user email_verified_at to current time
   * -> save user's info.
   *
   * @param mixed body
   * @return int
   * @throws NotFoundException
   * @throws UnauthorizedException
   */
    function verifyAccount(mixed $body): int {
        $user = User::find($body['id']);
        if (!$user) {
            throw new NotFoundException();
        }
        if (strcmp(($user->confirmation_token), $body['token']) !== 0) {
            throw new UnauthorizedException();
        }
        $user->email_verified_at = Carbon::now();
        $user->confirmation_token = 1;
        $user->status = StatusType::ACTIVE;
        return $user->save();
    }

    /**
     * Execute password
     * -> Check user
     * -> Check confirmation_token field value
     * -> update user email_verified_at to current time
     * -> save user's info.
     *
     * @param mixed body
     * @return User
     */
    function forgotPassword(mixed $body): int {
        $user = User::where('email', $body['email'])->first();
        if (!$user) {
            throw new NotFoundException();
        }
        $token = Str::uuid();
        $user->reset_password_token = $token;
        $user->status = StatusType::SUSPENDED;
        Mail::to($user->email)->send(new ForgotPassword($token));

        return $user->save();
    }

    /**
     * Update user password
     * -> Find user by reset_password_token
     * -> Hash new password
     * -> Update user meta fields
     * -> Save user
     *
     * @param mixed body
     * @return User
     */
    function updatePassword(mixed $body): int {
        $user = User::where('reset_password_token', $body['token'])->first();
        if (!$user) {
            throw new NotFoundException();
        }

        $user->password = bcrypt($body['password']);
        $user->updated_at = Carbon::now();
        $user->reset_password_token = null;
        $user->status = StatusType::ACTIVE;
        return $user->save();
    }

    /**
     * Get all users order by created_at by default
     */
    function getUsers(mixed $body = [])
    {
        return User::orderByDesc('created_at')->get();
    }

    function create(mixed $body = [])
    {
      return DB::transaction(function() use ($body) {
        $newUser = User::create($body);
        $newAccount = $this->accountService->create($newUser->id);
        return $newUser;
      });
    }

    function getOne(string $userId)
    {
      if (empty($userId)) {
        throw new InvalidParamException();
      }
      return User::find($userId)->first();
    }

    function updateUser(string $id, mixed $body = [])
    {
      $user = User::find($id);
      if (empty($user)) {
        return false;
      }
      return $user->update($body);
    }
}
