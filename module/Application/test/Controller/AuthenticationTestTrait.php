<?php

namespace ApplicationTest\Controller;

use Acl\Acl;
use DateTime;
use ReflectionClass;
use User\Auth\Authentication;
use User\Model\User;
use Laminas\Authentication\Storage\Session;
use Laminas\ServiceManager\ServiceManager;

/**
 * Trait AuthenticationTrait
 * @package ApplicationTest\Controller
 *
 * @codeCoverageIgnore
 */
trait AuthenticationTestTrait
{
    /**
     * @param ServiceManager $serviceManager
     * @throws \ReflectionException
     */
    public function authenticate(ServiceManager $serviceManager, $permissionToRemove = null)
    {
        $user = new User([
            'id' => 1,
            'name' => 'Test',
            'email' => 'test@gmail.com',
            'password' => password_hash('123456', PASSWORD_DEFAULT),
            'lastLogin' => new DateTime(),
            'roleId' => 1,
            'permissions' => $this->buildPermissions($serviceManager, $permissionToRemove)
        ]);

        $session = new Session(Authentication::SESSION_NAME);
        $session->write($user);
    }

    protected function unAuthenticate()
    {
        $session = new Session(Authentication::SESSION_NAME);
        $session->clear();
    }

    /**
     * @param ServiceManager $serviceManager
     * @return array
     * @throws \ReflectionException
     */
    private function buildPermissions(ServiceManager $serviceManager, $permissionToRemove = null)
    {
        $controllersList = $serviceManager->get('config')['controllers'];
        $controllers = array_merge_recursive(
            $controllersList['factories'],
            $controllersList['invokables']
        );

        $resources = [];
        foreach ($controllers as $controller) {
            $reflection = new ReflectionClass($controller);

            if ($reflection->hasConstant(Acl::RESOURCE_NAME)
                && $reflection->hasConstant(Acl::PRIVILEGES)
            ) {
                $resource = $reflection->getConstant(Acl::RESOURCE_NAME);
                $privileges = $reflection->getConstant(Acl::PRIVILEGES);

                if ($permissionToRemove && in_array($permissionToRemove, $privileges)) {
                    $key = array_search($permissionToRemove, $privileges);
                    if ($key > -1) {
                        unset($privileges[$key]);
                    }
                }

                $resources[$resource] = $privileges;
            }
        }

        $resources['home'] = ['create', 'read', 'update', 'delete'];

        return $resources;
    }
}
