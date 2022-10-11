<?php

namespace App\Exceptions;

use Exception;

class InvalidParamException extends Exception
{
  /**
   * Render the exception into an HTTP response.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
    public function render($request)
    {
      return response()->json([
        'status' => 400,
        'message' => 'Invalid Parameter',
      ], 400);
    }
}
