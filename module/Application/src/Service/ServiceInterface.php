<?php declare(strict_types=1);

namespace Application\Service;

/**
 * Interface ServiceInterface
 * @package Application\Service
 */
interface ServiceInterface
{
    /**
     * @param array $data
     * @return int
     */
    public function insert(array $data): int;

    /**
     * @param $id
     * @param array $data
     * @return int
     */
    public function update($id, array $data): int;

    /**
     * @param int $id
     * @return int
     */
    public function delete($id): int;

    /**
     * @return string
     */
    public function getErrorInfo(): string;
}
