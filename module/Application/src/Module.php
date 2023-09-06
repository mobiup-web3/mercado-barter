<?php

namespace Application;

use Application\Mail\Mail;
use Application\Service\OneSignalService;
use Application\Service\SMSService;
use Application\View\Helper\ConfigViewHelper;
use Application\View\Helper\ExceptionMailViewHelper;
use Application\View\Helper\ExceptionTelegramViewHelper;
use Application\View\Helper\FormatDocumentViewHelper;
use Application\View\Helper\NextNetworkDayViewHelper;
use Application\View\Helper\SlugifyViewHelper;
use Exception;
use GuzzleHttp\Client;
use Laminas\Authentication\AuthenticationService;
use Laminas\Authentication\Storage\Session;
use Laminas\Db\Adapter\Adapter;
use Laminas\EventManager\EventInterface;
use Laminas\Mail\Transport\Smtp;
use Laminas\Mail\Transport\SmtpOptions;
use Laminas\ModuleManager\Feature\ConfigProviderInterface;
use Laminas\ModuleManager\Feature\InitProviderInterface;
use Laminas\ModuleManager\Feature\ServiceProviderInterface;
use Laminas\ModuleManager\Feature\ViewHelperProviderInterface;
use Laminas\ModuleManager\ModuleManagerInterface;
use Laminas\Mvc\Controller\AbstractActionController;
use Laminas\Mvc\MvcEvent;
use Laminas\ServiceManager\Config;
use Laminas\ServiceManager\ServiceManager;
use Laminas\View\Renderer\PhpRenderer;


/**
 * Class Module
 * @package Application
 *
 * @codeCoverageIgnore
 */
class Module implements
    ConfigProviderInterface,
    ServiceProviderInterface,
    InitProviderInterface,
    ViewHelperProviderInterface
{
    const VERSION = '1.0.1-dev';
    const APPLICATION_NAME = 'SVM';

    public function getConfig()
    {
        return include __DIR__ . '/../config/module.config.php';
    }

    public function getServiceConfig()
    {
        return [
            'factories' => [
                // Services
                SMSService::class => function (ServiceManager $serviceManager) {
                    $config = $serviceManager->get('config')['sms'];
                    $adapter = $serviceManager->get(Adapter::class);

                    return new SMSService($config, new Client(), $adapter);
                },

                OneSignalService::class => function (ServiceManager $serviceManager) {
                    $config             = $serviceManager->get('config')['onesignal'];
                    $configOneSignal    = $serviceManager->get('config')['onesignal_consumidor'];

                    return new OneSignalService($config, $serviceManager->get(PushNotificationTableGateway::class), $configOneSignal, $serviceManager->get(ServiceManager::class));
                },
                Mail::class => function (ServiceManager $serviceManager) {
                    $emailConfig = $serviceManager->get('config')['mail'];

                    $smtpOptions = new SmtpOptions($emailConfig);
                    $transport = new Smtp($smtpOptions);

                    try {
                        $renderer = $serviceManager->get('ViewRenderer');
                    } catch (Exception $e) {
                        $renderer = new PhpRenderer();
                    }

                    return new Mail($transport, $emailConfig, $renderer, 'contact');
                },
            ]
        ];
    }

    /**
     * @inheritdoc
     */
    public function init(ModuleManagerInterface $manager)
    {
        $sharedEvents = $manager->getEventManager()
            ->getSharedManager();

        $sharedEvents->attach(__NAMESPACE__, MvcEvent::EVENT_DISPATCH, function (MvcEvent $event) {
            $auth = new AuthenticationService();
            $auth->setStorage(new Session(Authentication::SESSION_NAME));

            /** @var AbstractActionController $controller */
            $controller = $event->getTarget();
            $matchedRoute = $controller->getEvent()
                ->getRouteMatch()
                ->getMatchedRouteName();

            $config = $this->getConfig();
            $routes = $config['router']['routes'];

            $whitelist = [];

            foreach ($routes as $routeName => $routeConfig) {
                if (isset($routeConfig['public'])
                    && $routeConfig['public'] === true) {
                    $whitelist[] = $routeName;
                }

                if (isset($routeConfig['child_routes'])) {
                    foreach ($routeConfig['child_routes'] as $childRouteName => $childRoute) {
                        if (isset($childRoute['public'])
                            && $childRoute['public'] === true) {
                            $whitelist[] = $routeName . '/' . $childRouteName;
                        }
                    }
                }

            }

            if (! $auth->hasIdentity() && ! in_array($matchedRoute, $whitelist)) {
                return $controller->redirect()
                    ->toRoute('waitlist');
            }
        }, 100);
    }

    /**
     * Expected to return \Laminas\View\ServiceManager\Config object or array to
     * seed such an object.
     *
     * @return array|Config
     */
    public function getViewHelperConfig()
    {
        return [
            'invokables' => [
                NextNetworkDayViewHelper::class => NextNetworkDayViewHelper::class,
                SlugifyViewHelper::class => SlugifyViewHelper::class,
                FormatDocumentViewHelper::class => FormatDocumentViewHelper::class,
                ExceptionMailViewHelper::class => ExceptionMailViewHelper::class,
                ExceptionTelegramViewHelper::class => ExceptionTelegramViewHelper::class
            ],
            'aliases' => [
                'proximoDiaUtil' => NextNetworkDayViewHelper::class,
                'nextNetworkDay' => NextNetworkDayViewHelper::class,
                'slugify' => SlugifyViewHelper::class,
                'formatCnpj' => FormatDocumentViewHelper::class,
                'formatCpf' => FormatDocumentViewHelper::class,
                'exceptionMail' => ExceptionMailViewHelper::class,
                'exceptionTelegram' => ExceptionTelegramViewHelper::class,
            ],
            'factories' => [
                'config' => function (ServiceManager $serviceManager) {
                    return new ConfigViewHelper($serviceManager->get('config'));
                },
            ]
        ];
    }

    public function onBootstrap(EventInterface $e)
    {
        $app = $e->getApplication();
        $evt = $app->getEventManager();
        $evt->attach(MvcEvent::EVENT_DISPATCH_ERROR, [$this,'onDispatchError'], 100);
    }

    public function onDispatchError(MvcEvent $e)
    {
        $vm = $e->getViewModel();
        $vm->setTemplate('layout/error');
    }
}
