<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AdminUsersController extends Controller
{
    public function index()
    {
        $users = User::orderByDesc('id')->get(['id', 'name', 'email', 'is_admin', 'created_at']);

        return response()->json([
            'users' => $users,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:4'],
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => $validated['password'],
            'is_admin' => true,
        ]);

        return response()->json([
            'message' => 'Usuario creado correctamente.',
            'user' => $user->only(['id', 'name', 'email', 'is_admin', 'created_at']),
        ], 201);
    }
}
