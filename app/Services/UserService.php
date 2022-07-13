<?php

namespace App\Services;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Str;
use App\Exceptions\UnauthorizedException;
use App\Exceptions\NotFoundException;
use Illuminate\Support\Facades\Mail;
use App\Mail\SignUpConfirm;
use App\Mail\ForgotPassword;
use Carbon\Carbon;
use App\Enums\StatusType;


class UserService
{
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
        if (!Auth::attempt(['email' => $email, 'password' => $password])) {
            throw new UnauthorizedException();
        }
        $user = Auth::user();
        $tokenVerified = "1";
        if (empty($user->email_verified_at) || $user->confirmation_token !== $tokenVerified || $user->status !== StatusType::ACTIVE) {
            throw new UnauthorizedException();
        }
        $accessToken = $user->createToken('authToken')->accessToken;
        return ['user' => $user, 'access_token' => $accessToken];
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
     * @return User
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
     * Get all users
     */
    function getUsers(mixed $body = [])
    {
        return User::all();
    }

    function updateUser(mixed $body = [])
    {
      $user = User::find($body['userId']);
      if (!$user) {
        return 0;
      }
      foreach($body as $key => $value) {
        if ($key !== 'userId') {
          $user[$key] = $value;
        }
      }
      return $user->save();
    }
}
