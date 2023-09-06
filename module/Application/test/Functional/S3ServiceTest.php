<?php

namespace ApplicationTest\Functional;

use Application\Service\S3Service;
use Aws\Credentials\Credentials as AWSCredentials;
use Aws\S3\S3Client;
use PHPUnit\Framework\TestCase;

/**
 * Class S3ServiceTest
 * @package ApplicationTest\Functional
 *
 * @group S3
 */
class S3ServiceTest extends TestCase
{
    public function testUploadReadAndDelete()
    {
        $local = require __DIR__ . '/../../../../config/autoload/local.php';
        $s3Config = $local['aws']['s3'];

        $credentials = new AWSCredentials($s3Config['aws_access_key_id'], $s3Config['aws_secret_access_key']);

        $s3 = new S3Client([
            'version' => $s3Config['version'],
            'region' => $s3Config['region'],
            'credentials' => $credentials,
        ]);

        $key = 'app-icone.png';
        $source = __DIR__ . '/../../../../public/images/' . $key;
        $destination = 'test_sr_' . $key;

        $service = new S3Service($s3, $s3Config);

        $result = $service->uploadFile($source, $destination);
        $result = $result->toArray();

        $this->assertIsArray($result);
        $this->assertNotNull($result['ObjectURL']);

        $fileExists = $service->fileExists('test_sr_' . $key);
        $this->assertTrue($fileExists);

        $service->deleteFile('test_sr_' . $key);
    }
}
