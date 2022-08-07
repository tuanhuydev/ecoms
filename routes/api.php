<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\api\TaskController;
use App\Http\Controllers\api\UserController;
use App\Http\Controllers\api\FileController;
use Illuminate\Support\Facades\Mail;
use  App\Mail\SignUpConfirm;


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
    Route::post('/', [TaskController::class, 'createTask'])->name('tasks.create');
    Route::patch('/', [TaskController::class, 'updateTask'])->name('tasks.update');
    Route::get('/{id}', [TaskController::class, 'getTaskById'])->name('tasks.getById');
    Route::delete('/{id}', [TaskController::class, 'deleteTask'])->name('tasks.delete');
});

Route::group([
  'middleware' => 'auth:api',
  'prefix' => 'users'
] ,function() {
    Route::get('/', [UserController::class, 'getUsers'])->name('users.getUsers');
    Route::post('/', [UserController::class, 'createUser'])->name('users.createUser');
    Route::patch('/', [UserController::class, 'updateUser'])->name('users.updateUser');
});


/*
|--------------------------------------------------------------------------
| Commons API
|--------------------------------------------------------------------------
*/

// Upload
Route::post('/upload', [FileController::class, 'uploadImage'])->name('upload.image');




/*
|--------------------------------------------------------------------------
| Testing API
|--------------------------------------------------------------------------
*/
