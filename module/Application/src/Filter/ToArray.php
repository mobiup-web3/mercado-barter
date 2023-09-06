<?php

namespace Application\Filter;

use Laminas\Filter\AbstractFilter;
use Laminas\Filter\Exception;

/**
 * Class ToArray
 * @package Application\Filter
 */
class ToArray extends AbstractFilter
{
    /**
     * @var string
     */
    private $delimiter = ' ';

    /**
     * Returns the result of filtering $value
     *
     * @param mixed $value
     * @return mixed
     * @throws Exception\RuntimeException If filtering $value is impossible
     */
    public function filter($value)
    {
        $delimiter = isset($this->options['delimiter']) ? $this->options['delimiter'] : $this->delimiter;
        $result = [];

        if (is_string($value)) {
            if (strstr($value, $delimiter)) {
                $result = explode($delimiter, $value);
                $result = array_filter(array_map('trim', $result));
            } else {
                $result = [$value];
            }
        } else {
            $result = $value;
        }

        return $result;
    }

    /**
     * @param $delimiter
     */
    public function setDelimiter($delimiter)
    {
        $this->delimiter = $delimiter;
    }
}
