<?php

namespace App\Http\Controllers;

use App\Http\Requests\Account\UpdateProfileRequest;
use Illuminate\Http\JsonResponse;

class AccountController extends Controller
{
    public function update(UpdateProfileRequest $request): JsonResponse
    {
        $user = request()->user();

        $user->update($request->validated());

        return response()->json();
    }
}
