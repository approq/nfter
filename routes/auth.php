<?php

use App\Http\Controllers\Auth\WalletAuthController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('connect', [WalletAuthController::class, 'create'])->name('connect');

    Route::post('connect', [WalletAuthController::class, 'store']);
});

Route::middleware('auth')->group(function () {
    Route::post('disconnect', [WalletAuthController::class, 'destroy'])->name('disconnect');
});
