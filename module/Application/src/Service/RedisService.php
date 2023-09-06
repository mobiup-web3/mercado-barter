<?php

namespace Application\Service;

class RedisService
{
    private $redis;
    private $redisIsConnected = false;

    public function __construct($redisConfig)
    {
        if (! empty($redisConfig['host'])) {
            try {
                $this->redis = new \Redis();
                $this->redis->connect($redisConfig['host'], $redisConfig['port']);
                $this->redisIsConnected = true;
            } catch (\Exception $e) {

            }
        }
    }

    public function getFromRedis($key)
    {
        if (! $this->redisIsConnected) {
            return false;
        }

        $key = $this->prepareRedisKey($key);

        $value = $this->redis->get($key);

        if (! empty($value)) {
            return json_decode($value, true)['redis-value'];
        }

        return false;
    }

    public function setOnRedis($key, $value, $timeout = null)
    {
        if (! $this->redisIsConnected) {
            return;
        }

        $key = $this->prepareRedisKey($key);

        $value = [
            'redis-value' => $value,
        ];

        $options = [
            'EX' => 1800
        ];

        if ($timeout !== null) {
            $timeout = (int) $timeout;
            $value['redis-timeout'] = time() + $timeout;

            $options['EX'] = $timeout;
        }

        $this->redis->set($key, json_encode($value), $options);
    }

    public function delFromRedis($key)
    {
        if (! $this->redisIsConnected) {
            return;
        }

        $key = $this->prepareRedisKey($key);
        $this->redis->del($key);
    }

    private function prepareRedisKey($key)
    {
        $key = str_replace("\t", '', $key);
        $key = str_replace("\n", '', $key);
        $key = str_replace(" ", '', $key);
        $key = md5($key);

        return $key;
    }
}
