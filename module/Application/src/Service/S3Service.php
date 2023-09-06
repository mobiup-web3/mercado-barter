<?php

namespace Application\Service;

use Aws\Result;
use Aws\S3\S3Client;
use Exception;

/**
 * Class S3Service
 * @package Application\Service
 */
class S3Service
{
    /**
     * @var S3Client
     */
    private $s3;

    /**
     * @var array
     */
    private $config;

    /**
     * S3Service constructor.
     * @param S3Client $s3
     * @param array $config
     */
    public function __construct(S3Client $s3, array $config)
    {
        $this->s3 = $s3;
        $this->config = $config;
    }

    /**
     * Alias for putObject
     *
     * @param $source
     * @param $destination
     * @param string|null $bucket
     * @return Result
     */
    public function uploadFile($source, $destination, $bucket = null)
    {
        return $this->putObject($source, $destination, $bucket);
    }

    /**
     * @param $source
     * @param $destination
     * @param string|null $bucket
     * @return Result
     */
    public function putObject($source, $destination, $bucket = null)
    {
        if (! $bucket) {
            $bucket = $this->config['bucket'];
        }

        return $this->s3->putObject([
            'Content-Disposition' => 'inline',
            'Bucket' => $bucket,
            'Key' => $destination,
            'SourceFile' => $source,
            'ACL'    => 'public-read',
        ]);
    }

    /**
     * Alias for deleteObject
     *
     * @param $fileName
     * @param string|null $bucket
     * @return Result
     */
    public function deleteFile($fileName, $bucket = null)
    {
        return $this->deleteObject($fileName, $bucket);
    }

    /**
     * @param $fileName
     * @param string|null $bucket
     * @return Result
     */
    public function deleteObject($fileName, $bucket = null)
    {
        if (! $bucket) {
            $bucket = $this->config['bucket'];
        }

        return $this->s3->deleteObject([
            'Bucket' => $bucket,
            'Key' => $fileName,
        ]);
    }

    /**
     * @param $fileName
     * @param string|null $bucket
     * @return Result
     */
    public function getFile($fileName, $bucket = null)
    {
        if (! $bucket) {
            $bucket = $this->config['bucket'];
        }

        try {
            $result = $this->s3->getObject([
                'Bucket' => $bucket,
                'Key' => $fileName
            ]);
        } catch (Exception $exception) {
            $result = null;
        }

        return $result;
    }

    /**
     * @param $fileName
     * @param string|null $bucket
     * @return bool
     */
    public function fileExists($fileName, $bucket = null)
    {
        if (! $bucket) {
            $bucket = $this->config['bucket'];
        }

        return $this->s3->doesObjectExist($bucket, $fileName);
    }

    public function getUrl($fileName)
    {
        return $this->config['endpoint'] . $fileName;
    }
}
