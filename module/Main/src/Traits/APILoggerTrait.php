<?php

namespace Main\Traits;

use Laminas\Log\Logger;

trait APILoggerTrait
{
    /**
     * @return mixed
     */
    public function log()
    {
        $logger = new Logger();
        $writer = new \Laminas\Log\Writer\Stream('data/logs/notice.log');
        $logger->addWriter($writer);
        Logger::registerErrorHandler($logger);
    }
}
