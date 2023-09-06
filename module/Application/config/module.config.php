<?php

namespace Application;

use Client\Controller\ProductsAdminController;
use CustomerRelationship\Controller\ConfigPushsAppController;
use Laminas\I18n\Translator\TranslatorServiceFactory;
use Laminas\Router\Http\Literal;
use Laminas\ServiceManager\Factory\InvokableFactory;

$defaultLocale = 'pt_BR';
if (isset($_COOKIE['lang']) && $_COOKIE['lang'] != 'pt_BR') {
    $defaultLocale = filter_input(INPUT_COOKIE, 'lang', FILTER_SANITIZE_STRING);
}

return [
    'router' => [
        'routes' => [
            'home' => [
                'type' => Literal::class,
                'public' => false,
                'options' => [
                    'route' => '/homee',
                    'defaults' => [
                        'controller' => Controller\IndexController::class,
                        'action' => 'index',
                    ],
                ],
            ],
        ],
    ],
    'controllers' => [
        'factories' => [
            Controller\IndexController::class => InvokableFactory::class,
        ],
        'invokables' => [
        ]
    ],
    'view_manager' => [
        'not_found_template' => 'error/404',
        'exception_template' => 'error/index',
        'template_map' => [
            'layout/layout' => __DIR__ . '/../view/layout/layout.phtml',
            'application/index/index' => __DIR__ . '/../view/application/index/index.phtml',
            'error/404' => __DIR__ . '/../view/error/404.phtml',
            'error/index' => __DIR__ . '/../view/error/index.phtml',
        ],
        'template_path_stack' => [
            __DIR__ . '/../view',
        ],
    ],
    'service_manager' => [
        'factories' => [
            'translator' => TranslatorServiceFactory::class,
        ],
    ],
    'translator' => [
        'locale' => $defaultLocale,
        'translation_file_patterns' => [
            [
                'type' => 'gettext',
                'base_dir' => __DIR__ . '/../language',
                'pattern' => '%s.mo',
            ],
        ],
    ],
];
