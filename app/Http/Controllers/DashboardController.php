<?php

namespace App\Http\Controllers;

use App\Services\AlchemyService;
use Inertia\Response;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __construct(
        protected AlchemyService $alchemyService
    ) {
    }

    public function index(): Response
    {
        return Inertia::render('Dashboard/Index', [
            'balances' => $this->alchemyService->getBalances("0x0060656e41993d070fcb22845ca3818a4f0b3c15")
        ]);
    }
}
