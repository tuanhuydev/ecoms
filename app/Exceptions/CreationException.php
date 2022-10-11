<?php

namespace App\Exceptions;

use Exception;

class CreationException extends Exception
{
  public function report()
  {
      return response()->json([
        'status' => 500,
        'message' => 'Create Error',
      ], 500);
  }
}
