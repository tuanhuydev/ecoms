<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\UserService;
use App\Http\Resources\UserResource;
use App\Http\Traits\TransformArrayTrait;
use App\Exceptions\NotFoundException;
use App\Exceptions\InvalidParamException;
use Illuminate\Support\Facades\Validator;
use BenSampo\Enum\Rules\EnumValue;
use App\Enums\StatusType;
use Throwable;

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

    function getUser(Request $request)
    {
      if (empty($request->id)) {
        throw new InvalidParamException();
      }
      $user = $this->userService->getOne($request->id);
      return new UserResource($user);
    }

    function createUser(Request $request): \Illuminate\Http\JsonResponse
    {
      try {
        $validatedData = $request->validate([
          'firstName' => 'required|max:50',
          'lastName' => 'required|max:50',
          'email' => 'required|max:50',
          'phone' => 'required|max:20',
          'avatar' => 'nullable',
          'password' => 'required|min:8|max:16|same:confirmPassword',
          'confirmPassword' => 'required|min:8|max:16',
          'status' => ['required', new EnumValue(StatusType::class)],
          'permission' => 'required|in:GUEST,ADMIN,MAINTAINER'
        ]);
        $validatedData['created_by'] = $request->user()->id;
        $validatedData['password'] = bcrypt($validatedData['password']);
        $newUser = $this->userService->create($this->toSnake($validatedData));
        return response()->json(['id' => $newUser->id]);
      } catch(CreationException $e) {
        return response()->json([
          'message' => $exception->getMessage()
      ], 500);
      }
    }

    function updateUser(Request $request): \Illuminate\Http\JsonResponse
    {
      if (empty($request->id)) {
        throw new InvalidParamException();
      }

      $validatedData = $this->toSnake($request->validate([
        'firstName' => 'nullable|max:50',
        'lastName' => 'nullable|max:50',
        'email' => 'nullable|max:50',
        'phone' => 'nullable|max:20',
        'avatar' => 'nullable',
        'dueDate' => 'nullable',
        'status' => ['nullable', new EnumValue(StatusType::class)],
      ]));
      return response()->json(['success' => $this->userService->updateUser($request->id, $validatedData)]);
    }
}
