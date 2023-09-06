<?php

namespace Application\Filter;

use Laminas\Filter\AbstractFilter;

/**
 * Class DocumentRemoveMaskFilter
 * @package Application\Filter
 */
class DocumentRemoveMaskFilter extends AbstractFilter
{
    /**
     * @param mixed $value
     * @return mixed|string
     */
    public function filter($value)
    {
        return (string)preg_replace("/\D/", '', $value);
    }
}
