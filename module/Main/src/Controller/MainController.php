<?php

namespace Main\Controller;

use Laminas\Mvc\Controller\AbstractActionController;
use Laminas\Mvc\MvcEvent;
use Laminas\ServiceManager\ServiceManager;
use Laminas\View\Model\ViewModel;
use ServiceManagerTrait\ServiceManagerTrait;

class MainController extends AbstractActionController
{
    use ServiceManagerTrait;

    private $serviceManager;

    public function __construct(ServiceManager $serviceManager)
    {
        $this->serviceManager = $serviceManager;
    }

    public function indexAction()
    {
        return new ViewModel([]);
    }

    //TODO: Adicionar metodo de formatação de retorno para APIs

    public function onDispatch(MvcEvent $e)
    {
        $this->layout('layout/main');
        return parent::onDispatch($e);
    }
}
