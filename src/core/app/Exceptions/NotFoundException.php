<?php

namespace App\Exceptions;
use Illuminate\Http\Request;

use Exception;

class NotFoundException extends Exception
{
    public function report()
    {
        return response()->json([
            'status' => 404,
            'message' => 'Not Found',
        ], 404);
    }
}
