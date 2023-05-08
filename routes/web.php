<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\NftController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index']);

    Route::get('/nfts', [NftController::class, 'index']);

    Route::prefix('account')->group(function () {
        Route::post('me', [AccountController::class, 'update']);
    });
});

require __DIR__.'/auth.php';

Route::any('{url}', function(){
    return redirect('/connect');
})->where('url', '.*');
