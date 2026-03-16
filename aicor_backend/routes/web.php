<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/db-test', function () {
    try {
        DB::connection()->getPdo();
        return 'Conexión OK';
    } catch (\Exception $e) {
        return 'Error: ' . $e->getMessage();
    }
});

