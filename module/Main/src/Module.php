<?php

namespace Main;

use Application\Mail\Mail;
use Main\Controller\MainController;
use Main\Db\TableGateway\SampleTableGateway;
use Main\Model\Sample;
use Main\Service\MainService;
use Laminas\Db\Adapter\Adapter;
use Laminas\Db\ResultSet\ResultSet;
use Laminas\Db\TableGateway\TableGateway;
use Laminas\ModuleManager\Feature\ConfigProviderInterface;
use Laminas\ServiceManager\ServiceManager;
use Main\Service\Web3Service;

class Module implements ConfigProviderInterface
{
    public function getConfig()
    {
        return include __DIR__ . '/../config/module.config.php';
    }

    public function getControllerConfig()
    {
        return [
            'factories' => [
                MainController::class => function ($container) {
                    return new MainController(
                        $container->get(ServiceManager::class)
                    );
                }
            ]
        ];
    }

    public function getServiceConfig()
    {
        return [
            'factories' => [
                SampleTableGateway::class => function (ServiceManager $serviceManager) {
                    $adapter = $serviceManager->get(Adapter::class);
                    $tableGateway = $this->getTableGateway($adapter, new Sample(), SampleTableGateway::TABLE);

                    return new SampleTableGateway($tableGateway);
                },
                MainService::class => function (ServiceManager $serviceManager) {
                    $config          = $serviceManager->get('config');
                    $from            = $config['mail'];
                    $mail            = $serviceManager->get(Mail::class);

                    return new MainService($mail, $from);
                },
                Web3Service::class => function (ServiceManager $serviceManager) {
                    $config = $serviceManager->get('config');
                    return new Web3Service($config);
                },
            ]
        ];
    }

    public function getTableGateway(Adapter $adapter, $model, $table)
    {
        $resultSetPrototype = new ResultSet();
        $resultSetPrototype->setArrayObjectPrototype($model);

        return new TableGateway(
            $table,
            $adapter,
            null,
            $resultSetPrototype
        );
    }
}
