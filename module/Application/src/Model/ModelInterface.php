<?php

namespace Application\Model;

/**
 * Interface ModelInterface
 * @package Application\Model
 */
interface ModelInterface
{
    /**
     * @return int
     */
    public function getId();

    /**
     * @param array $input
     * @return mixed
     */
    public function exchangeArray($input);

    /**
     * @return array
     */
    public function toArray();
}
