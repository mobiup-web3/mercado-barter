<?php

namespace Main\Traits;

use http\Exception\RuntimeException;
use Laminas\Http\Headers;
use Laminas\Http\Response;
use Laminas\Mvc\Controller\AbstractController;
use Laminas\View\Model\JsonModel;

trait CorsOptions
{
    /**
     * @var Headers
     */
    protected $headers;

    /**
     * @return JsonModel
     */
    public function corsOptions()
    {
        if (! $this instanceof AbstractController) {
            throw new RuntimeException('Trait only useful in controllers');
        }

        $this->addHeaders();

        $this->headers->addHeaderLine("Content-Length: 2");

        return new JsonModel();
    }

    /**
     *
     */
    public function addHeaders()
    {
        /** @var Response $response */
        $response = $this->getResponse();
        $this->headers = $response->getHeaders();
        $this->headers->addHeaderLine("Access-Control-Allow-Origin: *");
        $this->headers->addHeaderLine("Access-Control-Allow-Methods: GET,POST,PUT,DELETE,OPTIONS");

        $allowHeaders = [
            'Access-Control-Allow-Origin',
            'authorization',
            'cache-control',
            'content-type',
            'origin',
            'X-Requested-With',
            'accept',
            'grant_type'
        ];

        $this->headers->addHeaderLine("Access-Control-Allow-Headers: " . implode(',', $allowHeaders));
    }
}
