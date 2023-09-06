<?php

namespace Application\Filter;

use Laminas\Filter\AbstractFilter;
use Laminas\Filter\Exception;

/**
 * Class CurrencyToInt
 * @package Application\Filter
 */
class CurrencyToInt extends AbstractFilter
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
        if (! is_scalar($value)) {
            return $value;
        }
        $value = (string)$value;
        $value = str_replace(['R$', ' '], '', $value);
        $value = str_replace(['.', ','], ['', ''], $value);

        return (int)$value;
    }
}
