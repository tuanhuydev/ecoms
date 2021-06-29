<?php

namespace App\Services;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Str;
use App\Exceptions\UnauthorizedException;

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
        };
        $user = Auth::user();
        $accessToken = $user->createToken('authToken')->accessToken;
        return ['user' => $user, 'access_token' => $accessToken];
    }

    /**
     * Create new user
     * @param mixed body
     * @return bool
     */
    function register(mixed $body): bool {
        $body['user_id'] = Str::uuid();
        $body['password'] = bcrypt($body['password']);
        $user = User::create($body);
        return true;
    }

    function getUserInfo(int $userId): User
    {
        return User::find($userId);
    }
}
