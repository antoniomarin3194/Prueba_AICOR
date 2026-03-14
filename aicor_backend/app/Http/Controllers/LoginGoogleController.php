<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Tymon\JWTAuth\Facades\JWTAuth;

class LoginGoogleController extends Controller
{
    function redirect(){
        /** @var \Laravel\Socialite\Two\AbstractProvider $provider */
        $provider = Socialite::driver('google');

        return $provider->stateless()->redirect();
    }

    function callback(){
        /** @var \Laravel\Socialite\Two\AbstractProvider $provider */
        $provider = Socialite::driver('google');
        $googleUser = $provider->stateless()->user();

        $user = User::updateOrCreate([
            'google_id' => $googleUser->id,
        ], [
            'name' => $googleUser->name,
            'email' => $googleUser->email,
            'google_token' => $googleUser->token,
            'google_refresh_token' => $googleUser->refreshToken,
        ]);

        $token = JWTAuth::fromUser($user);

        return redirect()->away("http://localhost:5173/auth/callback?token=$token");

    }
}
