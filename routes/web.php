<?php

use App\Http\Controllers\NftController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::get('/nfts', [NftController::class, 'index']);
});

require __DIR__.'/auth.php';

Route::any('{url}', function(){
    return redirect('/connect');
})->where('url', '.*');
