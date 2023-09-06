<?php

namespace Application\Model;

use Laminas\Hydrator\ClassMethodsHydrator as ClassMethods;
use Laminas\Hydrator\NamingStrategy\UnderscoreNamingStrategy;

/**
 * Trait ToArrayTrait
 * @package Application\Model
 */
trait ToArrayTrait
{
    /**
     * @param bool $underscoredKeys
     * @return array
     */
    public function toArray($underscoredKeys = true)
    {
        $hydrator = new ClassMethods(false);
        if ($underscoredKeys) {
            $hydrator->setNamingStrategy(new UnderscoreNamingStrategy());
        }

        return $hydrator->extract($this);
    }
}
