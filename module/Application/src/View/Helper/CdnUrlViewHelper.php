<?php

namespace Application\View\Helper;

use Laminas\View\Helper\AbstractHelper;

/**
 * Class CdnUrlViewHelper
 * @package Application\View\Helper
 */
class CdnUrlViewHelper extends AbstractHelper
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

    /**
     * @param $fileName
     * @return string
     */
    public function __invoke($fileName)
    {
        $tipo_conexao = $_SERVER['HTTP_HOST'];

        if (($tipo_conexao == 'localhost:8080') || ($tipo_conexao == '127.0.0.1:8080')){
            return '/assets' . $fileName;
        }

        return $this->config['endpoint'] . $fileName;
    }
}
