<?php

namespace App\Jobs;

use App\Models\User;
use App\Services\AlchemyService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class FetchUserNftsJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        protected User $user,
    ) {}

    public function handle(): void
    {
        $alchemyService = new AlchemyService();

        $nfts = $alchemyService->getNFTs($this->user->address);

        foreach ($nfts as $nft) {
            $this->user->nfts()->create([
                'title' => $nft->title,
                'token_id' => $nft->id->tokenId,
                'image' => $nft->media[0]->gateway,
                'thumbnail' => $nft->media[0]->thumbnail,
                'collection_name' => $nft->contractMetadata->openSea->collectionName,
                'collection_image' => $nft->contractMetadata->openSea?->imageUrl ?? null,
                'collection_website' => $nft->contractMetadata->openSea?->externalUrl ?? null
            ]);
        }
    }
}
