<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Services\UserService;
use Illuminate\View\View;

class AuthController extends Controller
{
    protected UserService $userService;

    function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * Render auth page's view
     *  
     * @param string $type
     * @return View
     */
    public function index (String $type) {
        return view('pages.auth', [
            'type' => $type ?? 'Login'
        ]);
    }

    /**
     * Distrubute request to correct function
     * 
     * @param Request $request
     * @param string $type
     */
    public function auth(Request $request, string $type ) 
    {
        $type = $request->type;
        switch($type) {
            case 'login':
                return $this->login($request);
            case 'register':
                return $this->register($request);
            default:
                throw new Error();
        }
    }

    public function login(Request $request) 
    {
        //TODO: catch 400 on field validation
        $body = $request->validate([
            'email' => 'required|max:50',
            'password' => 'required|min:8|max:16',
        ]);

        $result = $this->userService->authenticate($body['email'], $body['password']);
        return response()->json(['user' => $result['user'], 'access_token' => $result['access_token']]);
    }

    public function register(Request $request) 
    {
        $body = $request->validate([
            'first_name' => 'required|max:50',
            'last_name' => 'required|max:50',
            'email' => 'email|required|unique:users',
            'password' => 'required|min:8|max:16'
        ]);
        $result = $this->userService->register($body);
        return response()->json([ 'success' => $result ]);
    }
}
