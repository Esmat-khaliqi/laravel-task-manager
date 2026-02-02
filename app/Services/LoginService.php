<?php 

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class LoginService
{
    public function check(array $data): ?User
    {
        $user = User::where('email','=',$data['email'])->first();
        if(!$user){
            return null;
        }
        if(!Hash::check($data['password'],$user->password)){
            return null;
        }
        return $user;
    }
}