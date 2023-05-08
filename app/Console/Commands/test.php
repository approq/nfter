<?php

namespace App\Console\Commands;

use Cloutier\PhpIpfsApi\IPFS;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class test extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:test';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $response = Http::withHeaders([
            'Authorization' => '2PKQLCuulLjcSU4o3NMWNzIQbLY:f30896a0546ddccab8df3e8ee39be8e7'
        ])->post('https://ipfs.infura.io:5001/api/v0/api/v0/add?pin=false');

        var_dump($response->body());
    }
}
