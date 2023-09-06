<?php

namespace ApplicationTest\Service;

use Application\Service\ImageUploadService;
use PHPUnit\Framework\TestCase;

/**
 * Class ImageUploadServiceTest
 * @package ApplicationTest\Service
 *
 * @group Application
 * @group Service
 * @group ApplicationService
 */
class ImageUploadServiceTest extends TestCase
{
    /**
     * @var ImageUploadService
     */
    protected $service;

    protected function setUp()
    {
        parent::setUp();

        $this->service = new ImageUploadService('test/1');
    }

    protected function tearDown()
    {
        parent::tearDown();

        rmdir(__DIR__ . '/../../../../public/files/test/1');
    }

    public function testUpload()
    {
        $imageData = [
            'name' => 'test.png',
            'tmp_name' => __DIR__ . '/../../../../public/images/barcode.png',
            'error' => 0,
            'size' => 1234
        ];

        $result = $this->service->upload($imageData);

        $this->assertFalse($result);
    }

    public function testUploadRenaming()
    {
        $imageData = [
            'name' => 'test.png',
            'tmp_name' => __DIR__ . '/../../../../public/images/barcode.png',
            'error' => 0,
            'size' => 1234
        ];

        $result = $this->service->upload($imageData, 'test.png');

        $this->assertFalse($result);
    }
}
