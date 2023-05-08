<?php

namespace App\Http\Requests\Auth;

use App\Rules\MetaMaskSignatureRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreWalletAuthRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }
    public function rules(): array
    {
        return [
            'address' => ['required', 'string'],
            'signature' => ['required', new MetaMaskSignatureRule]
        ];
    }
}
