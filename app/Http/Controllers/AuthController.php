<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Services\RegisterService;
use App\Services\LoginService;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function store(RegisterRequest $request , RegisterService $service)
    {
        $user  = $service->create($request->validated());
        Auth::login($user);
        $request->session()->regenerate();
        return response()->json([
            'success'=>true,
            'message'=>'user create success',
        ],201);
        
    }

    public function userAuth(LoginRequest $request , LoginService $service)
    {
        $user = $service->check($request->validated());
        if(!$user){
            return response()->json([
                'success'=>false,
                'message'=>'!Incorrect email or password.'
            ], 422);
        }
        Auth::login($user);
        $request->session()->regenerate();
        return response()->json([
            'success'=>true,
            'message'=>'Login successful',
        ],200);
    }
}
