<?php

namespace Application\Service;

use Application\Db\TableGateway\PushNotificationTableGateway;
use Client\Db\TableGateway\ClientTableGateway;
use Client\Db\TableGateway\OneSignalPlayerIdTableGateway;
use Client\Db\TableGateway\RegisterTableGateway;
use Client\Model\Client;
use Client\Model\OneSignalPlayerId;
use Client\Model\Register;
use Exception;
use Laminas\ServiceManager\ServiceManager;

/**
 * Class OneSignalService
 * @package Application\Service
 */
class OneSignalService
{
    /**
     * @var array
     */
    private $config;

    /**
     * @var array
     */
    private $configConsumdor;

    /**
     * @var PushNotificationTableGateway
     */
    private $pushNotificationTableGateway;

    /**
     * @var ServiceManager
     */
    private $serviceManager;

    public function __construct($config, PushNotificationTableGateway $pushNotificationTableGateway, $configConsumdor, ServiceManager $serviceManager)
    {
        $this->config                       = $config;
        $this->pushNotificationTableGateway = $pushNotificationTableGateway;
        $this->configConsumdor              = $configConsumdor;
        $this->serviceManager               = $serviceManager;
    }

    /**
     * @param $playerIds
     * @param $message
     * @param null $title
     * @param bool $verbose
     * @param array $additionalData
     * @return bool|string
     * @throws Exception
     */
    public function sendMessage($playerIds, $message, $title = null, $verbose = false, $additionalData = [], $consumidor = false, $send_after = null, $send_after_two_days = null)
    {
        if (! is_array($playerIds)) {
            $playerIds = [$playerIds];
        }

        $content = ["en" => $message];

        if ($consumidor == false) {
            $fields = [
                'app_id'                => $this->config['app_id'],
                'include_player_ids'    => $playerIds,
                'large_icon'            => $this->config['large_icon'],
                'contents'              => $content,
                'priority'              => $this->config['priority'],
                'isIos'                 => $this->config['isIos'],
                'ios_badgeType'         => $this->config['ios_badgeType'],
                'ios_badgeCount'        => $this->config['ios_badgeCount'],
                'content_available'     => $this->config['content_available']
            ];
        } else {
            $fields = [
                'app_id'                => $this->configConsumdor['app_id'],
                'include_player_ids'    => $playerIds,
                'large_icon'            => $this->configConsumdor['large_icon'],
                'contents'              => $content,
                'priority'              => $this->configConsumdor['priority'],
                'isIos'                 => $this->configConsumdor['isIos'],
                'ios_badgeType'         => $this->configConsumdor['ios_badgeType'],
                'ios_badgeCount'        => $this->configConsumdor['ios_badgeCount'],
                'content_available'     => $this->configConsumdor['content_available']
            ];
        }

        if ($send_after) {
            $fields['send_after'] = date('Y-m-d H:i:s', strtotime('+1 days', strtotime(date("Y-m-d H:i:s")))).' GMT-0700';
        }

        if ($send_after_two_days) {
            $fields['send_after'] = date('Y-m-d H:i:s', strtotime('+2 days', strtotime(date("Y-m-d H:i:s")))).' GMT-0700';
        }

        if ($title) {
            $fields['headings'] = ['en' => $title];
        }

        if (! empty($additionalData)) {
            $fields['data'] = $additionalData;
        }

        $fields = json_encode($fields);

        if ($verbose) {
            print("\nJSON sent:\n");
            print($fields);
        }

        try {
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $this->config['url']);
            curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json; charset=utf-8',
                'Authorization: Basic ' . $this->config['authorization']]);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_HEADER, false);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

            $response = curl_exec($ch);
            curl_close($ch);

            $this->pushNotificationTableGateway->insert([
                'payload' => $fields,
                'response' => $response,
                'created_at' => date('Y-m-d H:i:s')
            ]);
            return $response;
        } catch (Exception $exception) {
            throw $exception;
        }
    }

    public function players(Client $cliente)
    {
        /** @var ClientTableGateway $clientTableGateway */
        $clientTableGateway = $this->serviceManager->get(ClientTableGateway::class);

        /** @var Client $client */
        $client = $clientTableGateway->select(['client_id' => $cliente->getClientId()])->current();

        /** @var RegisterTableGateway $registerTableGateway */
        $registerTableGateway = $this->serviceManager->get(RegisterTableGateway::class);

        /** @var Register $register */
        $register = $registerTableGateway->select(['cpf_cnpj' => $client->getCnpj()])->current();

        if ($register) {
            /** @var OneSignalPlayerIdTableGateway $oneSignalPlayerIdTableGateway */
            $oneSignalPlayerIdTableGateway = $this->serviceManager->get(OneSignalPlayerIdTableGateway::class);

            /** @var OneSignalPlayerId $oneSignalPlayer */
            $oneSignalPlayerId = $oneSignalPlayerIdTableGateway->select(['register_id' => $register->getId()]);

            return $oneSignalPlayerId;
        }
        return null;
    }
}
