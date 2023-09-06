<?php

namespace AppllicationTest\Service;

use Application\Service\SMSService;
use GuzzleHttp\Client;
use PHPUnit\Framework\TestCase;
use Laminas\Db\Adapter\Adapter;

/**
 * Class SMSServiceTest
 * @package AppllicationTest\Service
 *
 * @group SMS
 */
class SMSServiceTest extends TestCase
{
    public function testSendMessageSuccess()
    {
        $config = [
            'api' => [
                'url' => 'https://api-rest.zenvia.com/services/send-sms',
                'authorization' => 'bW9iaXVwLnNtc29ubGluZTp5b3ZFWlpVVEUz',
                'conta' => 'mobiup.smsonline',
                'senha' => 'yovEZZUTE3'
            ],
            'from' => 'Its Nft'
        ];

        $response = json_encode([
            'sendSmsResponse' => [
                "statusCode" => "00",
                "statusDescription" => "Ok",
                "detailCode" => "000",
                "detailDescription" => "Message Sent"
            ]
        ]);

        $client = \Mockery::mock(Client::class);
        $client->shouldReceive('post')->andReturn($client);
        $client->shouldReceive('getBody')->andReturn($response);

        $adapter = \Mockery::mock(Adapter::class);
        $adapter->shouldReceive('query')->andReturn($adapter);
        $adapter->shouldReceive('execute')->andReturn($adapter);

        $sms = new SMSService($config, $client, $adapter);

        $result = $sms->sendMessage('41984054350', 'Seu código de ativação: 1234');

        $this->assertTrue($result);
    }

    public function testSendMessageFailCaseOne()
    {
        $config = [
            'api' => [
                'url' => 'https://api-rest.zenvia.com/services/send-sms',
                'authorization' => 'xpto'
            ],
            'from' => 'Its Nft'
        ];

        $response = json_encode([
            'sendSmsResponse' => [
                "statusCode" => "10",
                "statusDescription" => "Ok",
                "detailCode" => "999",
                "detailDescription" => "Unknown Error"
            ]
        ]);

        $client = \Mockery::mock(Client::class);
        $client->shouldReceive('post')->andReturn($client);
        $client->shouldReceive('getBody')->andReturn($response);

        $adapter = \Mockery::mock(Adapter::class);
        $adapter->shouldReceive('query')->andReturn($adapter);
        $adapter->shouldReceive('execute')->andReturn($adapter);

        $sms = new SMSService($config, $client, $adapter);

        $result = $sms->sendMessage('41984054350', 'Mensagem de teste');

        $this->assertFalse($result);
    }

    public function testSendMessageFailCaseTwo()
    {
        $config = [
            'api' => [
                'url' => 'https://api-rest.zenvia.com/services/send-sms',
                'authorization' => 'xpto'
            ],
            'from' => 'Its Nft'
        ];

        $response = [
            'sendSmsResponse' => [
                "statusCode" => "10",
                "statusDescription" => "Ok",
                "detailCode" => "999",
                "detailDescription" => "Unknown Error"
            ]
        ];

        $client = \Mockery::mock(Client::class);
        $client->shouldReceive('post')->andReturn($client);
        $client->shouldReceive('getBody')->andReturn($response);

        $adapter = \Mockery::mock(Adapter::class);
        $adapter->shouldReceive('query')->andReturn($adapter);
        $adapter->shouldReceive('execute')->andReturn($adapter);

        $sms = new SMSService($config, $client, $adapter);

        $result = $sms->sendMessage('41984054350', 'Mensagem de teste');

        $this->assertFalse($result);
    }
}
