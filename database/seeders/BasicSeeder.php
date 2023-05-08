<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

abstract class BasicSeeder extends Seeder
{
    private string $seedName;

    public function __construct()
    {
        $this->seedName = get_class($this);
    }

    protected function saveSeed(): void
    {
        DB::table('seeds')->insert(
            [
                'seed' => $this->seedName,
                'batch' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now()
            ]
        );
    }

    protected function isNotSeeded(): bool
    {
        return DB::table('seeds')->where('seed', $this->seedName)->doesntExist();
    }
}
