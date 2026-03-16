<?php

use App\Http\Controllers\LoginGoogle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Firebase\JWT\JWT;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\CartController ;
use App\Http\Controllers\LoginGoogleController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\AdminUsersController;
use App\Http\Controllers\AdminOrdersController;

/*
 * Rutas de autenticación con Google
    */
Route::get('/auth/google/redirect', [LoginGoogleController::class, 'redirect']);
Route::get('/auth/google/callback', [LoginGoogleController::class, 'callback']);
Route::get('/products', [ProductsController::class, 'returnProducts']);

Route::prefix('admin')->group(function () {
    Route::post('/login', [AdminAuthController::class, 'login']);

    Route::middleware(['auth:api', 'admin'])->group(function () {
        Route::post('/logout', [AdminAuthController::class, 'logout']);
        Route::get('/me', function (Request $request) {
            return response()->json($request->user());
        });
        Route::post('/products', [ProductsController::class, 'adminStore']);
        Route::put('/products/{product}', [ProductsController::class, 'adminUpdate']);
        Route::delete('/products/{product}', [ProductsController::class, 'adminDestroy']);
        Route::post('/users', [AdminUsersController::class, 'store']);
        Route::get('/users', [AdminUsersController::class, 'index']);
        Route::get('/orders', [AdminOrdersController::class, 'index']);
        Route::put('/orders/{order}/status', [AdminOrdersController::class, 'updateStatus']);
    });
});
 

Route::middleware('auth:api')->group(function () {
    Route::get('/carrito/num-productos', [CartController::class, 'numProductos']);
    Route::get('/cart', [CartController::class, 'getCart']);
    Route::post('/cart/add', [CartController::class, 'addToCart']);
    Route::post('/cart/merge', [CartController::class, 'mergeCart']);
    Route::post('/cart/removeFromCart', [CartController::class, 'removeFromCart']);

    Route::post('/order/create', [OrderController::class, 'createOrder']);
    Route::get('/order/{id}', [OrderController::class, 'getOrder']);

    Route::get('/orders', [OrderController::class, 'getUserOrders']);
});



