<?php

namespace Application\Controller;

use Application\CSV\RelatorioPagamentos;
use Application\Db\TableGateway\ConfigTableGateway;
use Application\Form\ConfigForm;
use Application\Model\Config;
use Application\Service\ConfigService;
use Application\Traits\ServiceManagerTrait;
use Laminas\Db\Adapter\Adapter;
use Laminas\Http\Response;
use Laminas\Mvc\Controller\AbstractActionController;
use Laminas\View\Model\ViewModel;

/**
 * Class ConfigController
 * @package Application\Controller
 */
class ConfigController extends AbstractActionController
{
    use ServiceManagerTrait;

    /**
     * @return Response|ViewModel
     */
    public function configAction()
    {
        $request = $this->getRequest();
        /** @var ConfigTableGateway $configTableGateway */
        /** @var Config $config */
        $configTableGateway = $this->getServiceManager()->get(ConfigTableGateway::class);
        $config = $configTableGateway->findOneBy([], []);
        $form = new ConfigForm();
        $form->setData($this->extractResultToForm($config));

        $errorMessages = ['teste' => 'Erro'];

        if ($request->isPost()) {
            $data = $request->getPost()
                ->toArray();

            $form->setData($data);
            $namespace = 'error';
            $message = 'Não foi possível editar o registro';
            if ($form->isValid()) {
                $updatedConfig = [
                    'app_version' => $data['appVersion'],
                    'ios_version' => $data['iosVersion'],
                    'android_consumidor_version' => $data['androidConsumidorVersion'],
                    'ios_consumidor_version' => $data['iosConsumidorVersion'],
                    'ordenacao' => $data['ordenacao'],
                    'chat_sim' => $data['chatSim'],
                    'chat_hd' => $data['chatHd'],
                ];

                /** @var ConfigService $configservice */
                $configservice = $this->getServiceManager()->get(ConfigService::class);

                if ($configservice->atualizaConfig($updatedConfig)) {
                    $namespace = 'success';
                    $message = 'Configuração Editada com Sucesso';
                }
                $this->flashMessenger()
                    ->setNamespace($namespace)
                    ->addMessage($message);

                return $this->redirect()->toRoute('app-config-version');
            } else {
                foreach ($form->getMessages() as $message) {
                    $errorMessages[] = $message;
                }
            }
        }

        return new ViewModel([
            'paginator' => $config,
            'form'      => $form,
            'errorMessages' => $errorMessages,
        ]);
    }
    private function extractResultToForm(\ArrayObject $obj)
    {
        $config = [];
        if (isset($obj)) {
            $config['key'] = $obj->key;
            $config['value'] = $obj->value;
            $config['appVersion'] = $obj->app_version;
            $config['iosVersion'] = $obj->ios_version;
            $config['androidConsumidorVersion'] = $obj->android_consumidor_version;
            $config['iosConsumidorVersion'] = $obj->ios_consumidor_version;
            $config['chatSim'] = $obj->chat_sim;
            $config['chatHd'] = $obj->chat_hd;
            $config['ordenacao'] = $obj->ordenacao;
        }
        return $config;
    }
}
