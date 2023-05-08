<?php

namespace App\Rules;

use Closure;
use Elliptic\EC;
use Exception;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Support\Str;
use kornrunner\Keccak;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;

class MetaMaskSignatureRule implements ValidationRule
{
    private string $errorMessage = ':attribute does not match';

    /**
     * @throws ContainerExceptionInterface
     * @throws NotFoundExceptionInterface
     * @throws Exception
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $message = session()->pull('sign_message');

        $recId = ord(hex2bin(substr($value, 130, 2))) - 27;

        if ($recId != ($recId & 1)) {
            $fail($this->errorMessage);
        }

        $publicKey = (new EC('secp256k1'))->recoverPubKey(
            Keccak::hash(sprintf("\x19Ethereum Signed Message:\n%s%s", strlen($message), $message), 256),
            ['r' => substr($value, 2, 64), 's' => substr($value, 66, 64)],
            $recId
        );

        if ($this->pubKeyToAddress($publicKey) !== Str::lower(request()->get('address'))) {
            $fail($this->errorMessage);
        }
    }

    private function pubKeyToAddress($publicKey): string
    {
        return "0x" . substr(Keccak::hash(substr(hex2bin($publicKey->encode("hex")), 1), 256), 24);
    }
}
