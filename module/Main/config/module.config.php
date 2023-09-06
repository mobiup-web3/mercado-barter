<?php
namespace Main;

use Main\Controller\MainController;

return [
    'router' => [
        'routes' => [
            'main' => [
                'type' => 'Literal',
                'options' => [
                    'route' => '/',
                    'defaults' => [
                        'controller' => MainController::class,
                        'action' => 'index',
                    ],
                ],
                'may_terminate' => true,
                'child_routes' => [],
            ],
        ],
    ],

    'controllers' => [
        'invokables' => [],
    ],

    'view_manager' => [
        'strategies' => [
            'ViewJsonStrategy',
        ],
        'template_map' => [
            'layout/main' => __DIR__ . '/../view/main/main/site.phtml'
        ],
        'template_path_stack' => [
            __DIR__ . '/../view',
        ],
    ],
];
