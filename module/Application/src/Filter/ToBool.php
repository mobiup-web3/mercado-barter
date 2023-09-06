<?php

namespace Application\Filter;

use Laminas\Filter\AbstractFilter;
use Laminas\Filter\Exception;

/**
 * Class ToBool
 * @package Application\Filter
 */
class ToBool extends AbstractFilter
{
    /**
     * Returns the result of filtering $value
     *
     * @param mixed $value
     * @return mixed
     * @throws Exception\RuntimeException If filtering $value is impossible
     */
    public function filter($value)
    {
        return (bool)$value;
    }
}
