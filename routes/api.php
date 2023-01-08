<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\api\TaskController;
use App\Http\Controllers\api\UserController;
use App\Http\Controllers\api\FileController;
use App\Http\Controllers\api\AccountController;


Route::group(['prefix' => 'auth'], function() {
    Route::post('/{type}', [AuthController::class, 'auth']);
});

Route::get('/test', function() {
    return "ok";
});

/*
|--------------------------------------------------------------------------
| Task API
|--------------------------------------------------------------------------
*/
Route::group([
  'middleware' => 'auth:api',
  'prefix' => 'tasks'
], function() {
    Route::get('/', [TaskController::class, 'getAllTasks'])->name('tasks.getAll');
    Route::get('/categories', [TaskController::class, 'getTaskCategories'])->name('tasks.getTaskCategories');
    Route::post('/', [TaskController::class, 'createTask'])->name('tasks.create');
    Route::patch('/{id}', [TaskController::class, 'updateTask'])->name('tasks.update');
    Route::get('/{id}', [TaskController::class, 'getTaskById'])->name('tasks.getById');
    Route::delete('/{id}', [TaskController::class, 'deleteTask'])->name('tasks.delete');
});

/*
|--------------------------------------------------------------------------
| User API
|--------------------------------------------------------------------------
*/
Route::group([
  'middleware' => 'auth:api',
  'prefix' => 'users'
] ,function() {
    Route::get('/', [UserController::class, 'getUsers'])->name('users.getUsers');
    Route::get('/{id}', [UserController::class, 'getUser'])->name('users.getUser');
    Route::post('/', [UserController::class, 'createUser'])->name('users.createUser');
    Route::patch('/{id}', [UserController::class, 'updateUser'])->name('users.updateUser');
});

/*
|--------------------------------------------------------------------------
| Account API
|--------------------------------------------------------------------------
*/
Route::group([
  'middleware' => 'auth:api',
  'prefix' => 'accounts'
] ,function() {
    Route::patch('/{id}', [AccountController::class, 'updateAccount'])->name('accounts.update');
});

/*
|--------------------------------------------------------------------------
| File API
|--------------------------------------------------------------------------
*/
Route::group([
  'prefix' => 'files'
] ,function() {
  Route::post('/upload/{type}', [FileController::class, 'uploadImage'])->name('file.uploadImage');
  Route::get('/{type}/{path}', [FileController::class, 'showImage'])->name('file.showImage');
});

