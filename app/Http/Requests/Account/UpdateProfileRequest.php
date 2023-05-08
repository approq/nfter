<?php

namespace App\Http\Requests\Account;

use App\Models\Currency;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'currency_id' => ['sometimes', Rule::exists(Currency::class, 'id')]
        ];
    }
}
