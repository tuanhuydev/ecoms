<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Api\TaskController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['prefix' => 'auth'], function() {
    Route::post('/{type}', [AuthController::class, 'auth']);
});

Route::get('/test', function() {
    return "ok";
});

/**
 * TASKS API
 */
Route::group(['prefix' => 'tasks'], function() {
    Route::get('/', [TaskController::class, 'getAllTasks'])->name('tasks.getAll');
    Route::post('/', [TaskController::class, 'createTask'])->name('tasks.create');
    Route::patch('/', [TaskController::class, 'updateTask'])->name('tasks.update');
    Route::get('/{id}', [TaskController::class, 'getTaskById'])->name('tasks.getById');
    Route::delete('/{id}', [TaskController::class, 'deleteTask'])->name('tasks.delete');
});
