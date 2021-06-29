<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('pages.home');
});

Route::get('/auth/{type}', [AuthController::class, 'index']);

Route::prefix('admin')->group(function () {

    Route::get('/', function () {
        return view('pages.admin.index', [
            'active' => 'home'
        ]);
    })->name('admin.index');

    Route::get('/products', function () {
        return view('pages.admin.products', [
            'active' => 'products',
        ]);
    })->name('admin.products');


    Route::get('/orders', function () {
        return view('pages.admin.orders', [
            'active' => 'orders',
        ]);
    })->name('admin.orders');

    Route::get('/seo', function () {
        return view('pages.admin.seo', [
            'active' => 'seo',
        ]);
    })->name('admin.seo');

    Route::get('/blogs', function () {
        return view('pages.admin.blogs', [
            'active' => 'blog',
        ]);
    })->name('admin.blogs');
    
});