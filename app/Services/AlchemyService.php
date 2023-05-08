<?php

namespace App\Services;

use Illuminate\Http\Client\PendingRequest;
use Illuminate\Support\Facades\Http;

class AlchemyService
{
    private PendingRequest $eth;
    private PendingRequest $polygon;

    public function __construct()
    {
        $this->eth = Http::baseUrl(env('ALCHEMY_ETH_URL') . env('ALCHEMY_ETH_API_KEY'));
        $this->polygon = Http::baseUrl(env('ALCHEMY_POLYGON_URL') . env('ALCHEMY_POLYGON_API_KEY'));
    }

    public function getNFTs(string $address, array $options = ['withMetadata' => 'true']): array
    {
        $nfts = [];
        $pageKey = null;
        $urlParams = http_build_query($options);

        do {
            $response = $this->eth->get(
                "/getNFTs?owner=$address&$urlParams" . ($pageKey ? "&pageKey=$pageKey" : '')
            )->object();

            $nfts = [...$nfts, ...$response->ownedNfts];
            $pageKey = $response?->pageKey ?? null;
        } while ($pageKey);


        return $nfts;
    }

    public function getBalances(string $address, ): array
    {
        $balances = [];

        foreach (['eth' => 'eth', 'polygon' => 'matic'] as $key => $chain) {
            $balances[$chain] = $this->convertHexToFloat(
                $this->{$key}->post("", ["params" => [$address, "latest"], "method" => 'eth_getBalance'])->object()->result
            );
        }

        return $balances;
    }

    private function convertHexToFloat(string $hex): float
    {
        return hexdec($hex) / pow(10, 18);
    }
}

