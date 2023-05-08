<?php

namespace Database\Seeders;

use App\Models\Currency;

class CurrenciesSeeder extends BasicSeeder
{
    public function run(): void
    {
        if ($this->isNotSeeded()) {
            $currencies = [
                'USD',
                'EUR',
                'GBP'
            ];

            foreach ($currencies as $currency) {
                Currency::create([
                    'name' => $currency,
                ]);
            }

            $this->saveSeed();
        }
    }
}
