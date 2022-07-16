<?php

namespace App\Http\Controllers\api;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\File;
use Illuminate\Http\Request;

class FileController extends Controller
{
  function uploadImage(Request $request)
  {
    $systemPath = Storage::putFile('public', $request->file('avatar'));
    $publicPath = asset(Storage::url($systemPath));
    return response()->json(['path' => $publicPath]);
  }
}
