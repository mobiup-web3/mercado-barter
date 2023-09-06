<?php

namespace Application\View\Helper;

use Laminas\View\Helper\AbstractHelper;

/**
 * Class ConfigViewHelper
 * @package Application\View\Helper
 */
class ConfigViewHelper extends AbstractHelper
{
    /**
     * @var array
     */
    private $config;

    public function __construct(array $config)
    {
        $this->config = $config;
    }

    /**
     * @param null $key
     * @return array|mixed
     */
    public function __invoke($key = null)
    {
        if ($key && array_key_exists($key, $this->config)) {
            return $this->config[$key];
        }

        return $this->config;
    }
}
