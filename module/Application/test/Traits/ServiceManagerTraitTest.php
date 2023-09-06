<?php

namespace ApplicationTest\Traits;

use Application\Traits\ServiceManagerTrait;
use PHPUnit\Framework\TestCase;

/**
 * Class APILoggerTraitTest
 * @package ApplicationTest\Traits
 *
 * @group Application
 * @group Traits
 */
class ServiceManagerTraitTest extends TestCase
{
    use ServiceManagerTrait;

    /**
     * @expectedException \RuntimeException
     * @expectedExceptionMessage This trait is only useful in controllers
     */
    public function testExceptionNotAbstractControllerChild()
    {
        $this->getServiceManager();
    }
}
