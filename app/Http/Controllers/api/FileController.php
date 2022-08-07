<?php

namespace App\Http\Controllers\api;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FileController extends Controller
{
  function uploadImage(Request $request)
  {
    $validator = Validator::make($request->all(), [
      'file' => 'max:5x1024',
    ]);
    if (!$validator) {
      return $validator;
    }
    $systemPath = Storage::putFile('public', $request->file('avatar'));
    $publicPath = asset(Storage::url($systemPath));
    return response()->json(['path' => $publicPath]);
  }
}
