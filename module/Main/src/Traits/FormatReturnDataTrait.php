<?php

namespace Main\Traits;

use Laminas\Http\Response;
use Laminas\Mvc\Controller\AbstractRestfulController;
use Laminas\View\Model\JsonModel;

trait FormatReturnDataTrait
{
    /**
     * @param $data
     * @param bool $maintenance
     * @return JsonModel
     */
    public function formatReturnData(
        $data,
        $maintenance = false
    ) {
        /** @var Response $response */
        $response = $this->getResponse();

        if (! $this instanceof AbstractRestfulController) {
            throw new \RuntimeException('Trait only useful in controllers');
        }

        try {
            $logFilePath = 'data/logs/notice.log';
            $fileContent = file($logFilePath);
            $lastLine    = end($fileContent);

            if ($lastLine != "") {
                $response->setStatusCode(500);
            }

            unlink($logFilePath);
        } catch (\Exception $exception) {
            $lastLine = $exception->getMessage();
        }
        //var_dump($data);die;
        $returnData = [
            'data'          => $data,
            'maintenance'   => $maintenance,
            'request_time'  => (new \DateTime())->format('Y-m-d H:i:s.u'),
            'error_code'    => $lastLine
        ];

        return new JsonModel($returnData);
    }

    /**
     * @return array|false|mixed|string
     */
    private function extractData()
    {
        $data = $this->getRequest()->getPost()->toArray();
        if (empty($data)) {
            $data = file_get_contents('php://input');
            if (! empty($data)) {
                $data = json_decode($data, true);
            }
        }

        return $data;
    }
}
