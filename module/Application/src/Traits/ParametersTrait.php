<?php

namespace Application\Traits;

use Exception;
use RuntimeException;
use Laminas\Json\Json;
use Laminas\Mvc\Controller\AbstractController;
use Laminas\Http\Request;

/**
 * Trait ServiceManagerTrait
 * @package Application\Traits
 */
trait ParametersTrait
{

    /**
     * @param string $param Parameter name to retrieve, or null to get all.
     * @param mixed $default Default value to use when the parameter is missing.
     * @return mixed
     */
    protected function getJsonParameters($param = null, $default = null)
    {
        if (! $this instanceof AbstractController) {
            throw new RuntimeException('This trait is only useful in controllers');
        }

        /** @var Request $request */
        $request = $this->getRequest();
        $content = $request->getContent();
        $data = [];

        try {
            $data = Json::decode($content, 1);
        } catch (Exception $exception) {
            // nos testes automatizados, o post não vai no "content"
            // por isso, é pego aqui
            if ($request->isPost()) {
                $data = $request->getPost()->toArray();
            }
        }

        if ($param == null) {
            return $data;
        }
        return isset($data[$param]) ? $data[$param] : $default;
    }
}
