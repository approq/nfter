<?php

namespace App\Services;

use Illuminate\Http\Client\PendingRequest;
use Illuminate\Support\Facades\Http;

class AlchemyService
{
    private PendingRequest $request;

    public function __construct() {
        $this->request = Http::baseUrl(env('ALCHEMY_URL') . env('ALCHEMY_API_KEY'));
    }

    public function getNFTs(string $address, array $options = ['withMetadata' => 'true']): array
    {
        $nfts = [];
        $pageKey = null;
        $urlParams = http_build_query($options);

        do {
            $response = $this->request->get(
                "/getNFTs?owner=$address&$urlParams" . ($pageKey ? "&pageKey=$pageKey" : '')
            )->object();

            $nfts = [...$nfts, ...$response->ownedNfts];
            $pageKey = $response?->pageKey ?? null;
        } while ($pageKey);


        return $nfts;
    }
}

