<?php


namespace ApplicationTest\Filter;

use Application\Filter\ToArray;
use PHPUnit\Framework\TestCase;

/**
 * Class ToArrayTest
 * @package ApplicationTest\Filter
 *
 * @group Application
 */
class ToArrayTest extends TestCase
{
    public function testFilterWithDelimiter()
    {
        $filter = new ToArray();
        $filter->setOptions(['delimiter' => ',']);

        $input = '1,2,3,4,5';

        $result = $filter->filter($input);

        $this->assertInternalType('array', $result);
        $this->assertEquals(5, count($result));
    }
}
