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
     * conditional render base on $type
     *  
     * @param string $type
     * @return View
     */
    public function index (String $type) {
        if (in_array($type, array('sign-up', 'sign-in', 'verify-account', 'forgot-password', 'new-password'))) {
            $words = array_map(fn($word) => ucfirst($word), explode("-", $type));
            $title = join(" ", $words);
            $data = [
                'type' => $type,
                'title' => $title,
            ];
            return view('pages.auth', $data);
        } 
        return redirect()->route('home');       
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
            case 'sign-in':
                return $this->signIn($request);
            case 'sign-up':
                return $this->signUp($request);
            case 'verify-account':
                return $this->verifyAccount($request);
            case 'forgot-password':
                return $this->forgotPassword($request);
            case 'update-password':
                return $this->updatePassword($request);
            default:
                throw new Error();
        }
    }


    /**
     * Validate and call service to sign user in
     * 
     * @param Request $request
     * @return Response
     * 
     */
    private function signIn(Request $request) 
    {
        $body = $request->validate([
            'email' => 'required|max:50',
            'password' => 'required|min:8|max:16',
        ]);

        $result = $this->userService->signIn($body['email'], $body['password']);
        return response()->json(['user' => $result['user'], 'access_token' => $result['access_token']]);
    }

    /**
     * Validate and call service to sign user in
     * 
     * @param Request $request
     * @return Response
     * 
     */
    private function signUp(Request $request) 
    {
        $body = $request->validate([
            'first_name' => 'required|max:50',
            'last_name' => 'required|max:50',
            'email' => 'email|required|unique:users',
            'password' => 'required|min:8|max:16|same:confirm_password',
            'confirm_password' => 'required|min:8|max:16'
        ]);
        $result = $this->userService->signUp($body);
        return response()->json($result);
    }

    /**
     * Verify user's account base on userId and token
     * 
     * @param Request $request
     * @return Response
     * 
     */
    private function verifyAccount(Request $request)
    {
        $body = $request->validate([
            'token' => 'required',
            'id' => 'required',
        ]);
        $result = $this->userService->verifyAccount($body);
        return response()->json(['success' => $result]);
    }

    private function forgotPassword(Request $request)
    {
        $body = $request->validate([
            'email' => 'required|max:50',
        ]);
        $result = $this->userService->forgotPassword($body);
        return response()->json(['success' => $result]);
    }

    private function updatePassword(Request $request)
    {

        $body = $request->validate([
            'password' => 'required|min:8|max:16|same:confirm_password',
            'confirm_password' => 'required|min:8|max:16',
            'token' => 'required'
        ]);
        $success = $this->userService->updatePassword($body);
        return response()->json(['success' => $success]);
    }
}
