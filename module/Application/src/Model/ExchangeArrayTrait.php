<?php

namespace Application\Model;

use Laminas\Hydrator\ClassMethodsHydrator as ClassMethods;
use Laminas\Hydrator\NamingStrategy\UnderscoreNamingStrategy;

/**
 * Trait ExchangeArrayTrait
 * @package Application\Model
 */
trait ExchangeArrayTrait
{
    /**
     * @param $data
     */
    public function exchangeArray($data)
    {
        $hydrator = new ClassMethods(false);
        $hydrator->setNamingStrategy(new UnderscoreNamingStrategy());
        $hydrator->hydrate($data, $this);
    }
}
