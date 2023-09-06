<?php

namespace Application\Service;

use Exception;
use GuzzleHttp\Client;
use Laminas\Db\Adapter\Adapter;

/**
 * Class SMSService
 * @package Application\Service
 */
class SMSService
{
    const STATUS_CODE_SUCCESS = '00';
    const STATUS_CODE_UNKNOWN_ERROR = '10';

    /**
     * @var array
     *
     * 'api' => [
     *      'url' => 'https://api-rest.zenvia.com/services/send-sms',
     *      'authorization' => 'xpto'
     * ],
     * 'from' => 'Its Nft'
     */
    private $config;

    /**
     * @var array
     */
    private $statusCode = [
        '00' => 'Ok',
        '01' => 'Scheduled',
        '02' => 'Sent',
        '03' => 'Delivered',
        '04' => 'Not Received',
        '05' => 'Blocked - No Coverage',
        '06' => 'Blocked - Black listed',
        '07' => 'Blocked - Invalid Number',
        '08' => 'Blocked - Content not allowed',
        '09' => 'Blocked',
        '10' => 'Error',
    ];

    private $detailCode = [
        '000' => 'Message Sent',
        '002' => 'Message successfully canceled',
        '010' => 'Empty message content',
        '011' => 'Message body invalid',
        '012' => 'Message content overflow',
        '013' => 'Incorrect or incomplete ‘to’ mobile number',
        '014' => 'Empty ‘to’ mobile number',
        '015' => 'Scheduling date invalid or incorrect',
        '016' => 'ID overflow',
        '017' => 'Parameter ‘url’ is invalid or incorrect',
        '018' => 'Field ‘from’ invalid',
        '021' => '‘id’ fieldismandatory',
        '080' => 'Message with same ID already sent',
        '100' => 'Message Queued',
        '110' => 'Message sent to operator',
        '111' => 'Message confirmation unavailable',
        '120' => 'Message received by mobile',
        '130' => 'Message blocked',
        '131' => 'Message blocked by predictive cleansing',
        '132' => 'Message already canceled',
        '133' => 'Message content in analysis',
        '134' => 'Message blocked by forbidden content',
        '135' => 'Aggregate is Invalid or Inactive',
        '136' => 'Message expired',
        '140' => 'Mobile number not covered',
        '141' => 'International sending not allowed',
        '145' => 'Inactive mobile number',
        '150' => 'Message expired in operator',
        '160' => 'Operator network error',
        '161' => 'Message rejected by operator',
        '162' => 'Message cancelled or blocked by operator',
        '170' => 'Bad message',
        '171' => 'Bad number',
        '172' => 'Missing parameter',
        '180' => 'Message ID notfound',
        '190' => 'Unknown error',
        '200' => 'Messages Sent',
        '210' => 'Messages scheduled but Account Limit Reached',
        '240' => 'File empty or not sent',
        '241' => 'File too large',
        '242' => 'File readerror',
        '300' => 'Received messages found',
        '301' => 'No received messages found',
        '400' => 'Entity saved',
        '900' => 'Authentication error',
        '901' => 'Account type not support this operation.',
        '990' => 'Account Limit Reached – Please contact support',
        '998' => 'Wrong operation requested',
        '999' => 'Unknown Error',
    ];

    /**
     * @var string|null
     */
    private $detailMessage = null;

    /**
     * @var Client
     */
    private $client;

    /**
     * @var Adapter
     */
    private $adapter;

    /**
     * @var string|null
     */
    private $response;

    /**
     * SMSService constructor.
     * @param array $config
     * @param Client $client
     * @param Adapter $adapter
     */
    public function __construct(array $config, Client $client, Adapter $adapter)
    {
        $this->config = $config;
        $this->client = $client;
        $this->adapter = $adapter;
    }

    /**
     * @return string
     */
    public function getResponse()
    {
        return (string)$this->response;
    }

    /**
     * @param $number
     * @param $message
     * @return bool
     * @throws Exception
     */
    public function sendMessage($number, $message)
    {
        $number = str_replace(['-', ' ', '(', ')', 'x', 'X'], '', $number);

        $headers = [
            'Content-Type' => 'application/json',
            'Accept' => 'application/json',
            'Authorization' => 'Basic ' . $this->config['api']['authorization']
        ];

        $numberLenght = strlen($number);
        if ($numberLenght == 10 || $numberLenght == 11) {
            $number = '55' . $number;
        }

        $payload = [
            'sendSmsRequest' => [
                'from' => $this->config['from'],
                'to' => $number,
                'msg' => $message,
                'callbackOption' => 'NONE',
                'id' => uniqid()
            ]
        ];

        try {
            $response = $this->client->post($this->config['api']['url'], [
                'headers' => $headers,
                'json' => $payload
            ]);

            $response = $response->getBody();
            $this->response = $response;
            $response = json_decode($response, true);
            if (json_last_error() === JSON_ERROR_NONE) {
                if ($response['sendSmsResponse']['statusCode'] == self::STATUS_CODE_SUCCESS) {
                    $this->detailMessage = $response['sendSmsResponse']['detailDescription'];

                    $this->registerLog($number, $message, $response['sendSmsResponse']['statusCode']);

                    return true;
                } else {
                    $this->registerLog($number, $message, $response['sendSmsResponse']['statusCode']);
                    $this->detailMessage = $response['sendSmsResponse']['detailDescription'];
                }
            }

            $this->registerLog($number, $message, self::STATUS_CODE_UNKNOWN_ERROR);

            return false;
        } catch (Exception $exception) {
            $this->detailMessage = $exception->getMessage();
            $this->registerLog($number, $message, self::STATUS_CODE_UNKNOWN_ERROR);

            throw $exception;
        }
    }

    /**
     * @return string|null
     */
    public function getLastError()
    {
        return $this->detailMessage;
    }

    /**
     * @param $number
     * @param $message
     * @param $statusCode
     */
    private function registerLog($number, $message, $statusCode)
    {
        $query = "INSERT INTO `sms_enviados` (numero, conteudo, status_code) ";
        $query .= "VALUES ('$number', '$message', '$statusCode')";
        $this->adapter
            ->query($query)
            ->execute();
    }
}
