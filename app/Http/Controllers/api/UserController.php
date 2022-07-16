<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\UserService;
use App\Http\Resources\UserResource;
use App\Http\Traits\TransformArrayTrait;

class UserController extends Controller
{
    use TransformArrayTrait;
    private UserService $userService;

    function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    function getUsers(Request $request): \Illuminate\Http\Resources\Json\AnonymousResourceCollection
    {
      $users = $this->userService->getUsers();
      return UserResource::collection($users);
    }
    function createUser(Request $request): \Illuminate\Http\JsonResponse
    {
      $validatedData = $request->validate([
        'firstName' => 'required|max:50',
        'lastName' => 'required|max:50',
        'email' => 'required|max:50',
        'phone' => 'required|max:20',
        'password' => 'required|min:8|max:16|same:confirmPassword',
        'confirmPassword' => 'required|min:8|max:16',
        'status' => 'required|in:PENDING,ACTIVE,SUSPENDED,BLOCKED',
        'permission' => 'required|in:GUEST,ADMIN,MAINTAINER'
      ]);
      $validatedData['created_by'] = $request->user()->id;
      $validatedData['password'] = bcrypt($validatedData['password']);
      $newUser = $this->userService->create($this->toSnake($validatedData));
      return response()->json(['id' => $newUser->id]);
    }

    function updateUser(Request $request): \Illuminate\Http\JsonResponse
    {
      $validatedData = $request->validate([
        'userId' => 'required',
      ]);
      $loggedUserId =$request->user()->id;
      if ($loggedUserId === $validatedData['userId']) {
        return response()->json(['success' => false ]);
      }
      if ($request->status) {
        $validatedData['status'] = $request->status;
      }
      return response()->json(['success' => $this->userService->updateUser($validatedData)]);
    }
}
