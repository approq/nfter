<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\StoreWalletAuthRequest;
use App\Jobs\FetchUserNftsJob;
use App\Models\Currency;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class WalletAuthController extends Controller
{
    public function create(): Response
    {
        $nonce = Str::random();
        $message = "Sign this message to confirm you own this wallet address. This action will not cost any gas fees.\n\nNonce: " . $nonce;

        session()->put('sign_message', $message);

        return Inertia::render('Auth/WalletConnect', [
            'message' => $message,
        ]);
    }

    public function store(StoreWalletAuthRequest $request): RedirectResponse
    {
        $validatedData = $request->validated();

        $user = User::whereAddress($validatedData['address'])->first();

        if(!$user) {
            $user = User::create([
                'address' => $validatedData['address'],
                'currency_id' => Currency::DEFAULT,
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
