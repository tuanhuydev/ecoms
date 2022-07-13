<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\api\TaskController;
use App\Http\Controllers\api\UserController;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\File;
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
    Route::patch('/', [UserController::class, 'updateUser'])->name('users.updateUser');
});


/*
|--------------------------------------------------------------------------
| Commons API
|--------------------------------------------------------------------------
*/

// Upload
Route::post('/upload', function(Request $request) {
    $systemPath = Storage::putFile('public', $request->file('file'));
    $publicPath = asset(Storage::url($systemPath));
    return response()->json(['path' => $publicPath]);
});




/*
|--------------------------------------------------------------------------
| Testing API
|--------------------------------------------------------------------------
*/

Route::group(['prefix' => 'test'], function() {

    Route::get('/email', function(Request $request) {
        $MOCK_EMAIL = "lmjcvm@gmail.com";
        Mail::to($MOCK_EMAIL)->send(new SignUpConfirm());
    });
});
