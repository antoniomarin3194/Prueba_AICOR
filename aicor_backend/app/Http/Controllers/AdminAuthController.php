<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\JWTGuard;

class AdminAuthController extends Controller
{
    public function login(Request $request)
    {
        /** @var JWTGuard $guard */
        $guard = Auth::guard('api');

        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        if (! $token = $guard->attempt($credentials)) {
            return response()->json([
                'message' => 'Credenciales inválidas.',
            ], 401);
        }

        $user = $guard->user();

        if (! $user || ! $user->is_admin) {
            $guard->logout();

            return response()->json([
                'message' => 'No tienes permisos de administrador.',
            ], 403);
        }

        return response()->json([
            'message' => 'Login admin correcto.',
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'is_admin' => (bool) $user->is_admin,
            ],
        ]);
    }

    public function logout()
    {
        /** @var JWTGuard $guard */
        $guard = Auth::guard('api');
        $guard->logout();

        return response()->json([
            'message' => 'Sesión admin cerrada correctamente.',
        ]);
    }
}
