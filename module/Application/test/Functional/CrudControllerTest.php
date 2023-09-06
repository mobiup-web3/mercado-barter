<?php

namespace ApplicationTest\Functional;

use Application\Controller\IndexController;
use ApplicationTest\Controller\AuthenticationTestTrait;
use User\Db\TableGateway\UserTableGateway;
use User\Form\UserForm;
use Laminas\Stdlib\ArrayUtils;
use Laminas\Test\PHPUnit\Controller\AbstractHttpControllerTestCase;

/**
 * Class CrudControllerTest
 * @package ApplicationTest\Functional
 *
 * The tests bellow hit on database!
 *
 * @group Application
 * @group Controller
 * @group Functional
 */
class CrudControllerTest extends AbstractHttpControllerTestCase
{
    use AuthenticationTestTrait;

    /**
     * @var string
     */
    private $email;

    /**
     * @var UserTableGateway
     */
    private $tableGateway;

    public function setUp()
    {
        // The module configuration should still be applicable for tests.
        // You can override configuration here with test case specific values,
        // such as sample view templates, path stacks, module_listener_options,
        // etc.
        $configOverrides = include __DIR__ . '/../../../../config/development.config.php.dist';
        $this->setApplicationConfig(ArrayUtils::merge(
            include __DIR__ . '/../../../../config/application.config.php',
            $configOverrides
        ));

        parent::setUp();

        $this->email = 'test' . date('YmdHis') . '@gmail.com';

        $serviceManager = $this->getApplicationServiceLocator();

        $this->tableGateway = $serviceManager->get(UserTableGateway::class);
        $this->tableGateway->beginTransaction();
    }

    protected function tearDown()
    {
        parent::tearDown();

        $this->tableGateway->rollback();
        $this->unAuthenticate();
    }

    /**
     * @throws \Exception
     */
    public function testIndexActionRedirectWithUnauthenticatedUser()
    {
        $this->dispatch('/', 'GET');
        $this->assertResponseStatusCode(302);
        $this->assertModuleName('application');
        $this->assertControllerName(IndexController::class); // as specified in router's controller name alias
        $this->assertControllerClass('IndexController');
        $this->assertMatchedRouteName('home');
    }

    /**
     * @throws \Exception
     */
    public function testIndexActionBeAccessedWithLoggedUser()
    {
        $this->authenticate($this->getApplicationServiceLocator());

        $this->dispatch('/', 'GET');
        $this->assertResponseStatusCode(200);
        $this->assertModuleName('application');
        $this->assertControllerName(IndexController::class); // as specified in router's controller name alias
        $this->assertControllerClass('IndexController');
        $this->assertMatchedRouteName('home');
    }

    /**
     * @throws \Exception
     */
    public function testInvalidRouteDoesNotCrash()
    {
        $this->dispatch('/invalid/route', 'GET');
        $this->assertResponseStatusCode(404);
    }

    public function testListInactiveAction()
    {
        $this->authenticate($this->getApplicationServiceLocator());

        $this->dispatch('/application/listInactive');

        $this->assertResponseStatusCode(200);
        $this->assertModuleName('application');
        $this->assertControllerName(IndexController::class); // as specified in router's controller name alias
        $this->assertControllerClass('IndexController');
        $this->assertMatchedRouteName('application');
    }

    public function testAddActionSuccess()
    {
        $form = new UserForm('user', ['roles' => [1 => 'Admin']]);
        $csrf = $form->get('csrf')->getValue();

        $data = [
            'name' => 'Test',
            'displayName' => 'Test',
            'email' => $this->email,
            'password' => '123456',
            'password_confirmation' => '123456',
            'role' => 1,
            'csrf' => $csrf
        ];

        $this->authenticate($this->getApplicationServiceLocator());

        $this->dispatch('/application/add', 'POST', $data);

        $this->assertResponseStatusCode(302);
        $this->assertModuleName('application');
        $this->assertControllerName(IndexController::class); // as specified in router's controller name alias
        $this->assertControllerClass('IndexController');
        $this->assertMatchedRouteName('application');
    }

    public function testAddActionInvalidForm()
    {
        $data = [
            'name' => 'Test',
            'displayName' => 'Test',
            'email' => $this->email,
            'password' => '123456',
            'password_confirmation' => '123456',
            'role' => 1
        ];

        $this->authenticate($this->getApplicationServiceLocator());

        $this->dispatch('/application/add', 'POST', $data);

        $this->assertResponseStatusCode(200);
        $this->assertModuleName('application');
        $this->assertControllerName(IndexController::class); // as specified in router's controller name alias
        $this->assertControllerClass('IndexController');
        $this->assertMatchedRouteName('application');
    }

    public function testEditActionSuccess()
    {
        $form = new UserForm('user', ['roles' => [1 => 'Admin']]);
        $csrf = $form->get('csrf')->getValue();

        $data = [
            'name' => 'Test',
            'displayName' => 'Test',
            'email' => $this->email,
            'password' => '123456',
            'password_confirmation' => '123456',
            'role' => 1,
            'csrf' => $csrf
        ];

        $this->authenticate($this->getApplicationServiceLocator());

        $this->dispatch('/application/edit/1', 'POST', $data);

        $this->assertResponseStatusCode(302);
        $this->assertModuleName('application');
        $this->assertControllerName(IndexController::class); // as specified in router's controller name alias
        $this->assertControllerClass('IndexController');
        $this->assertMatchedRouteName('application');
    }

    public function testEditActionInvalidForm()
    {
        $data = [
            'name' => 'Test',
            'displayName' => 'Test',
            'email' => $this->email,
            'password' => '123456',
            'password_confirmation' => '123456',
            'role' => 1
        ];

        $this->authenticate($this->getApplicationServiceLocator());

        $this->dispatch('/application/edit/1', 'POST', $data);

        $this->assertResponseStatusCode(200);
        $this->assertModuleName('application');
        $this->assertControllerName(IndexController::class); // as specified in router's controller name alias
        $this->assertControllerClass('IndexController');
        $this->assertMatchedRouteName('application');
    }

    public function testInactivateAction()
    {
        $this->authenticate($this->getApplicationServiceLocator());

        $this->dispatch('/application/inactivate/1');

        $this->assertResponseStatusCode(302);
        $this->assertModuleName('application');
        $this->assertControllerName(IndexController::class); // as specified in router's controller name alias
        $this->assertControllerClass('IndexController');
        $this->assertMatchedRouteName('application');
    }

    public function testActivateAction()
    {
        $this->authenticate($this->getApplicationServiceLocator());

        $this->dispatch('/application/activate/1');

        $this->assertResponseStatusCode(302);
        $this->assertModuleName('application');
        $this->assertControllerName(IndexController::class); // as specified in router's controller name alias
        $this->assertControllerClass('IndexController');
        $this->assertMatchedRouteName('application');
    }
}
