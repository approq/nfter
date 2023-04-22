<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\StoreWalletAuthRequest;
use App\Jobs\FetchUserNftsJob;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class WalletAuthController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Auth/WalletConnect');
    }

    public function store(StoreWalletAuthRequest $request): RedirectResponse
    {
        $validatedData = $request->validated();

        $user = User::whereAddress($validatedData['address'])->first();

        if(!$user) {
            $user = User::create([
                'address' => $validatedData['address']
            ]);

            FetchUserNftsJob::dispatch($user);
        }

        Auth::login($user);

        $request->session()->regenerate();

        return redirect()->intended(RouteServiceProvider::HOME);
    }

    public function destroy(Request $request): RedirectResponse
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/connect');
    }
}
