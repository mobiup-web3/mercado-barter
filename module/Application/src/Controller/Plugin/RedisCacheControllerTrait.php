<?php


namespace Application\Controller\Plugin;


trait RedisCacheControllerTrait
{
    private $redisLastCacheQueryWasCached;

    public function getCachedQuery($select, $sqlParams = [], $extra = [])
    {
        $cacheName = $select;
        if (!empty($sqlParams)) $cacheName .= implode('|', $sqlParams);
        if (!empty($extra)) $cacheName .= implode('|', $extra);

        $results = $this->redisService->getFromRedis($cacheName);

        $this->redisLastCacheQueryWasCached = true;

        if (! $results) {
            $this->redisLastCacheQueryWasCached = false;

            $stmt = $this->db->query($select);
            $resultsDb = $stmt->execute($sqlParams);

            $results = [];

            foreach ($resultsDb as $result) {
                $results[] = $result;
            }

            $this->redisService->setOnRedis($cacheName, $results);
        }
        return $results;
    }

    public function wasLastQueryCached()
    {
        return $this->redisLastCacheQueryWasCached;
    }
}
