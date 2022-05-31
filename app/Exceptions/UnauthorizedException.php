<?php

namespace App\Exceptions;
use Illuminate\Http\Request;

use Exception;

class UnauthorizedException extends Exception
{
    public function report()
    {
        return response()->json([
            'status' => 401,
            'message' => 'Unauthorized',
        ], 401);
    }
}
