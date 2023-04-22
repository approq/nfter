<?php

namespace App\Data;

use Spatie\LaravelData\Data;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
class NftData extends Data
{
    public function __construct(
        public string $title,
        public string $thumbnail,
        public string $collection_name,
        public string|null $collection_image,
        public string|null $collection_website,
    ) {}
}
