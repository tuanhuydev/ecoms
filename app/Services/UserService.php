<?php

namespace App\Services;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Str;
use App\Exceptions\UnauthorizedException;
use App\Exceptions\NotFoundException;
use Illuminate\Support\Facades\Mail;
use  App\Mail\SignUpConfirm;
use Carbon\Carbon;

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
    function authenticate(string $email, string $password): array 
    {
        if (!Auth::attempt(['email' => $email, 'password' => $password])) {
            throw new UnauthorizedException();
        }
        $user = Auth::user();
        $tokenVerified = "1";
        if (empty($user->email_verified_at) || $user->confirmation_token !== $tokenVerified) {
            throw new UnauthorizedException();
        }
        $accessToken = $user->createToken('authToken')->accessToken;
        return ['user' => $user, 'access_token' => $accessToken];
    }

    /**
     * Create new user
     * @param mixed body
     * @return User
     */
    function register(mixed $body): User {
        $body['password'] = bcrypt($body['password']);
        $user = User::create($body);
        // Send verified email
        Mail::to($user->email)->send(new SignUpConfirm($user));

        return $user;
    }

    function getUserInfo(int $userId): User
    {
        return User::find($userId);
    }

    function verifyAccount(mixed $body): int {
        $user = User::find($body['id']);
        if (!$user) {
            throw new NotFoundException();
        }
        if (strcmp($user->confirmation_token, $body['token']) !== 1) {
            throw new UnauthorizedException();
        } 
        $user->email_verified_at = Carbon::now();
        $user->confirmation_token = 1;
        return $user->save();
        
    }
}
