<?php

namespace Application\Controller;

use Application\Db\TableGateway\CrudTableGateway;
use Application\Model\ModelInterface;
use Application\Service\ServiceInterface;
use Application\Traits\ServiceManagerTrait;
use Laminas\Form\Form;
use Laminas\Http\Request;
use Laminas\Mvc\Controller\AbstractActionController;
use Laminas\Mvc\I18n\Translator;
use Laminas\View\Model\ViewModel;
use Laminas\Session\SessionManager;
use Laminas\Session\Container;

/**
 * Class CrudController
 * @package Application\Controller
 */
abstract class CrudController extends AbstractActionController
{
    use ServiceManagerTrait;

    /**
     * @var CrudTableGateway
     */
    protected $tableGateway;

    /**
     * @var Form
     */
    protected $form;

    /**
     * @var ServiceInterface
     */
    protected $service;

    /**
     * @var
     */
    protected $parameters = [];

    /**
     * @var string
     */
    protected $redirectMethod = 'toRoute';

    /**
     * @var string
     */
    protected $redirectTo = 'home';

    /**
     * @var bool
     */
    protected $activeSearch = false;

    /**
     * @return \Laminas\Http\Response|ViewModel
     */
    public function indexAction()
    {
        if (! $this->isAllowed('read')) {
            return $this->redirect()
                ->{$this->redirectMethod}($this->redirectTo);
        }

        $this->validateDependencies();

        $paginator = $this->tableGateway->findAll(true, true);

        $pageNumber = (int)$this->params()
            ->fromRoute('page', 1);

        $paginator->setCurrentPageNumber($pageNumber);
        $paginator->setItemCountPerPage(30);

        return new ViewModel([
            'paginator' => $paginator
        ]);
    }

    /**
     * @return ViewModel
     */
    public function listInactiveAction()
    {
        if (! $this->isAllowed('read')) {
            return $this->redirect()
                ->{$this->redirectMethod}($this->redirectTo);
        }

        $this->validateDependencies();

        $paginator = $this->tableGateway->findBy(['active' => false], true);

        $pageNumber = (int)$this->params()
            ->fromRoute('page', 1);

        $paginator->setCurrentPageNumber($pageNumber);
        $paginator->setItemCountPerPage(30);

        return new ViewModel([
            'paginator' => $paginator
        ]);
    }

    /**
     * @return ViewModel
     */
    public function addAction()
    {
//        if (! $this->isAllowed('create')) {
//            return $this->redirect()
//                ->{$this->redirectMethod}($this->redirectTo);
//        }
//
//        $this->validateDependencies();
        $this->form = new UserForm();
        $errorMessages = [];

        /** @var Request $request */
        $request = $this->getRequest();

        if ($request->isPost()) {
            $data = $request->getPost()
                ->toArray();
            $this->form->setData($data);

            if ($this->form->isValid()) {
                $data = $this->extractDataToService($this->form->getData());

                $namespace = 'error';
                $message = 'Could not add register';

                if ($this->service->insert($data)) {
                    $namespace = 'success';
                    $message = 'Register added';
                } else {
                    /** @var Translator $translator */
                    $translator = $this->getServiceManager()
                        ->get(Translator::class);

                    $errorInfo = $this->service->getErrorInfo();

                    $message = $translator->translate($message);
                    $message .= '. ' . $translator->translate('Error: ');
                    $message .= $translator->translate($errorInfo);
                }

                $this->flashMessenger()
                    ->setNamespace($namespace)
                    ->addMessage($message);

                return $this->redirect()
                    ->{$this->redirectMethod}($this->redirectTo);
            } else {
                $errorMessages = $this->form->getMessages();
            }
        }

        return new ViewModel([
            'form' => $this->form,
            'errorMessages' => $errorMessages
        ]);
    }

    /**
     * @return ViewModel
     */
    public function editAction()
    {
        if (! $this->isAllowed('update')) {
            return $this->redirect()
                ->{$this->redirectMethod}($this->redirectTo);
        }

        $this->validateDependencies(true);

        /** @var ModelInterface $model */
        $model = $this->tableGateway->find($this->parameters['id']);

        $this->form->setData($this->extractDataToForm($model));
        $errorMessages = [];

        /** @var Request $request */
        $request = $this->getRequest();

        if ($request->isPost()) {
            $data = $this->preFormProcess($request->getPost()->toArray());

            $this->form->setData($data);

            if ($this->form->isValid()) {
                $data = $this->extractDataToService($this->form->getData());

                $namespace = 'error';
                $message = 'Could not edit register';

                if ($this->service->update($this->parameters['id'], $data)) {
                    $namespace = 'success';
                    $message = 'Register edited';
                }

                $this->flashMessenger()
                    ->setNamespace($namespace)
                    ->addMessage($message);

                return $this->redirect()
                    ->{$this->redirectMethod}($this->redirectTo);
            } else {
                $errorMessages = $this->form->getMessages();
                var_dump($errorMessages);
                die();
            }
        }

        return new ViewModel([
            'form' => $this->form,
            'data' => $model,
            'errorMessages' => $errorMessages
        ]);
    }

    /**
     * @return \Laminas\Http\Response
     */
    public function inactivateAction()
    {
        if (! $this->isAllowed('delete')) {
            return $this->redirect()
                ->{$this->redirectMethod}($this->redirectTo);
        }

        return $this->changeStatus(false);
    }

    /**
     * @return \Laminas\Http\Response
     */
    public function activateAction()
    {
        if (! $this->isAllowed('update')) {
            return $this->redirect()
                ->{$this->redirectMethod}($this->redirectTo);
        }
        return $this->changeStatus(true);
    }

    /**
     * Strategy to manipulate data before setData in form.
     * The children can override with its own logic.
     *
     * @param ModelInterface $model
     * @return array
     */
    protected function extractDataToForm(ModelInterface $model)
    {
        return $model->toArray();
    }

    /**
     * Strategy to manipulate data before delegate to service.
     * The children can override with its own logic.
     *
     * @param $data
     * @return array
     */
    protected function extractDataToService($data)
    {
        return $data;
    }

    /**
     * @param array $data
     * @return array
     */
    protected function preFormProcess(array $data)
    {
        return $data;
    }

    /**
     * @param bool $mustHaveIdParam
     */
    protected function validateDependencies($mustHaveIdParam = false)
    {
        $serviceManager = $this->getServiceManager();

        // param ID validation
        if ($mustHaveIdParam) {
            $this->parameters['id'] = (int)$this->params()
                ->fromRoute('id', 0);

            if ($this->parameters['id'] === 0) {
                throw new \RuntimeException('Invalid id');
            }
        }

        // table gateway dependency validation
        if (! $this->tableGateway) {
            throw new \RuntimeException('You must to specify the table gateway');
        }

        if (! $this->tableGateway instanceof ServiceInterface) {
            if (! $serviceManager->has($this->tableGateway)) {
                throw new \RuntimeException('You must to specify a valid table gateway');
            }

            $this->tableGateway = $serviceManager->get($this->tableGateway);
        }


        // form dependency validation
        if (! $this->form) {
            throw new \RuntimeException('You must to specify the form');
        }

        if (! $this->form instanceof Form) {
            // First validate if the form is registered as a service. If yes, this means that
            // form has dependencies, so the service is fetched.
            if ($serviceManager->has($this->form)) {
                $this->form = $serviceManager->get($this->form);
            } elseif (class_exists($this->form)) {
                // if the form class really exists and a service was not defined, instantiate it
                $this->form = new $this->form();
            }
        }

        if (! $this->form) {
            throw new \RuntimeException('You must to specify a valid form');
        }

        // service dependency validation
        if (! $this->service) {
            throw new \RuntimeException('You must to specify the service');
        }

        if (! $this->service instanceof ServiceInterface) {
            if (! $serviceManager->has($this->service)) {
                throw new \RuntimeException('You must to specify a valid service');
            }

            $this->service = $serviceManager->get($this->service);
        }
    }

    /**
     * @param $status
     * @return mixed
     */
    private function changeStatus($status)
    {
        $action = 'inactivate';
        if ($status === true) {
            $action = 'activate';
        }

        $this->validateDependencies(true);

        $namespace = 'error';
        $message = 'Could not ' . $action . ' register';

        if ($this->tableGateway->update(
            [
                'active' => $status,
                'updated_at' => date('Y-m-d H:i:s')
            ],
            ['id' => $this->parameters['id']]
        )) {
            $namespace = 'success';
            $message = 'Register ' . $action . 'd';
        }

        $this->flashMessenger()
            ->setNamespace($namespace)
            ->addMessage($message);

        return $this->redirect()
            ->{$this->redirectMethod}($this->redirectTo);
    }

    protected function filterQuery($par = '')
    {
        $pars = $this->params()->fromQuery();
        $removeVars = ['SELECT', 'FROM', 'LIKE', 'RLIKE', 'DROP', 'DELETE', '='];

        foreach ($pars as $key => $value) {
            $pars[$key] = str_ireplace($removeVars, '', $value);
        }

        // Retrieve an instance of the session manager from the service manager.
        $sessionManager = $this->getServiceManager()->get(SessionManager::class);
        $sessionContainer = new Container('ContainerNamespace', $sessionManager);
        if ($par == 'clear') {
            unset($sessionContainer->par);
            unset($sessionContainer->status);
            unset($sessionContainer->sector);
            unset($sessionContainer->activated);
            return '';
        }

        if ($par != '' && isset($pars[$par])) {
            $sessionContainer->{$par} = $pars[$par];
            $this->activeSearch = true;
            return $pars[$par];
        } elseif (isset($sessionContainer->{$par})) {
            $this->activeSearch = true;
            return $sessionContainer->{$par};
        }
        $this->activeSearch = false;
        return '';
    }
}
