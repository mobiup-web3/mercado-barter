<?php


namespace Application\Helper;


class S3UrlHelper
{
    /**
     * @var array
     */
    private $config;

    /**
     * S3UrlViewHelper constructor.
     * @param array $config
     */
    public function __construct(array $config)
    {
        $this->config = $config;
    }

    public function diretorioPadraoS3(string $fileName)
    {
        $endpoint = $this->config['endpoint'] . 'assets';

        if (php_sapi_name() == 'cli-server' ||
            (isset($_SERVER['HTTP_HOST']) && strpos($_SERVER['HTTP_HOST'], 'localhost') !== false)) {
            $endpoint = 'assets';
        }

        return $endpoint . $fileName;
    }

}