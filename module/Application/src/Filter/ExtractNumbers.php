<?php

namespace Application\Filter;

use Laminas\Filter\FilterInterface;

/**
 * Class ExtractNumbers
 * @package Application\Filter
 */
class ExtractNumbers implements FilterInterface
{
    /**
     * @inheritdoc
     */
    public function filter($value)
    {
        return preg_replace("/\D/", '', $value);
    }
}
