<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class InvalidParamException extends Exception
{
  /**
   * Render the exception into an HTTP response.
   *
   * @param  Request  $request
   * @return Response
   */
    public function render($request)
    {
      return response()->json([
        'status' => 400,
        'message' => 'Invalid Parameter',
      ], 400);
    }
}
