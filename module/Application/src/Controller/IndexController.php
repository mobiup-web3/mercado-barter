<?php

namespace Application\Controller;

use Application\View\Helper\SlugifyViewHelper;
use Exception;
use Laminas\Http\Response;
use Laminas\View\Model\ViewModel;

/**
 * Class IndexController
 * @package Application\Controller
 */
class IndexController extends CrudController
{
    const RESOURCE_NAME = 'debits-admin';
    const PRIVILEGES = [
        'read', 'create'
    ];

    public function __construct()
    {
        $this->redirectTo   = 'home';
        $this->resource     = 'home';
        $this->resource     = self::RESOURCE_NAME;
        $this->addResource(self::RESOURCE_NAME);
    }

    /**
     * @return Response|ViewModel
     * @throws Exception
     */
    public function indexAction()
    {
        $this->layout()->activeMenu = 'home';

        $viewModel = new ViewModel([]);

        $slugify = new SlugifyViewHelper();

        return $viewModel;
    }
}
