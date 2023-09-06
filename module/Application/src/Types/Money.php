<?php declare(strict_types=1);

namespace Application\Types;

/**
 * Class Money
 * @package Aplication\Types
 */
class Money
{
    /**
     * @var int
     */
    private $value;

    /**
     * Money constructor.
     * @param $value
     */
    public function __construct($value)
    {
        $this->value = $value;
    }

    /**
     * @param bool $withMoneyPrefix
     * @return string
     */
    public function toBRL($withMoneyPrefix = true)
    {
        $value = ($this->value / 100);
        $value = number_format($value, 2, ',', '.');

        if (! $withMoneyPrefix) {
            return (string)$value;
        }

        return 'R$' . $value;
    }

    /**
     * @return float
     */
    public function toFloat()
    {
        $this->value = $this->value / 100;

        return number_format($this->value, 2, '.', '');
    }

    /**
     * @return int
     */
    public function toCents()
    {
        return $this->value;
    }

    /**
     * @return string
     */
    public function __toString()
    {
        return (string)$this->value;
    }
}
