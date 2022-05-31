<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\UserService;
use App\Http\Resources\UserResource;


class UserController extends Controller
{
    private UserService $userService;

    function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    function getUsers(Request $request)
    {
        $users = $this->userService->getUsers();
        return UserResource::collection($users);
    }
}
