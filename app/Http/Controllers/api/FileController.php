<?php

namespace App\Http\Controllers\api;
use App\Exceptions\InvalidParamException;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\CssSelector\Exception\InternalErrorException;
use Symfony\Component\HttpFoundation\StreamedResponse;
use App\Models\File;


class FileController extends Controller
{
  /**
   * @throws InvalidParamException
   * @throws InternalErrorException
   */
  function uploadImage(Request $request, string $type): JsonResponse
  {
    // TODO: File's size should be load from meta
    $validator = Validator::make($request->all(), [
      'file' => 'max:5x1024',
    ]);
    if (!$validator) {
      throw new InvalidParamException();
    }
    // Upload to s3
    $uploadedPath = $request->file('file')->store($type, 's3');

    if (is_null($uploadedPath)) {
      throw new InternalErrorException();
    }

    // Save Image
    $file = File::create([
      'name' => basename($uploadedPath),
      'url' => env('APP_URL')."/api/files/{$type}/".basename($uploadedPath)
    ]);

    return response()->json([
      'success' => true,
      'url' => $file->url
    ]);
  }

  function showImage(Request $request, string $type, string $path): StreamedResponse
  {
    return Storage::response("{$type}/{$path}");
  }
}
