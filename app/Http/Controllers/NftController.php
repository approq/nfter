<?php

namespace App\Http\Controllers;

use App\Data\NftData;
use Inertia\Inertia;
use Inertia\Response;

class NftController extends Controller
{
    public function index(): Response
    {
        $nfts = request()->user()->nfts;

        return Inertia::render('Nfts/Index', [
            'nfts' => NftData::collection($nfts),
        ]);
    }
}
