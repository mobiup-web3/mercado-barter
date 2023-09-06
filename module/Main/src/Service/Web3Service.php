<?php

namespace Main\Service;

use GuzzleHttp\Client;
use GuzzleHttp\Psr7\Request;

class Web3Service
{
    private $config;

    public function __construct(array $config)
    {
        $this->config = $config;
    }
}
