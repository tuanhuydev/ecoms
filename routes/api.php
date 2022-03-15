<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Api\TaskController;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\File;

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
Route::group(['prefix' => 'tasks'], function() {
    Route::get('/', [TaskController::class, 'getAllTasks'])->name('tasks.getAll');
    Route::post('/', [TaskController::class, 'createTask'])->name('tasks.create');
    Route::patch('/', [TaskController::class, 'updateTask'])->name('tasks.update');
    Route::get('/{id}', [TaskController::class, 'getTaskById'])->name('tasks.getById');
    Route::delete('/{id}', [TaskController::class, 'deleteTask'])->name('tasks.delete');
});

/**
 * COMMONS API
 */
Route::post('/upload', function(Request $request) {
    $systemPath = Storage::putFile('public', $request->file('file'));
    $publicPath = asset(Storage::url($systemPath));
    return response()->json(['path' => $publicPath]);
});