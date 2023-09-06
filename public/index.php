<?php

use Laminas\Mvc\Application;
use Laminas\Stdlib\ArrayUtils;

//header('Referrer-Policy: strict-origin-when-cross-origin');
//header('Referrer-Policy: no-referrer');

define('EMAIL_MOCK', 'erick.queiroz@mobiup.com.br');
define('CPF_MOCK', '054.478.473-11');

function formatMoney($input)
{
    $commaTarget = strlen($input) - 3;
    $commaOccurence = strpos($input, ',');
    if ($commaOccurence == $commaTarget) {
        $input = str_replace(['.', ','], ['', '.'], $input);
    }
    if (! is_float($input) && strpos($input, '.') === false) {
        $input = (float)$input / 100;
    }

    return 'R$ ' . number_format($input, 2, ',', '.');
}

/**
 * Converte Dolar em Real, conforme cotação atual
 * param $usd
 * @return string
 */
function convertUsToReal($usd)
{
    $client = new \GuzzleHttp\Client();
    $response = $client->request('GET', 'https://economia.awesomeapi.com.br/json/last/USD-BRL');
    $cotacao = json_decode($response->getBody()->getContents())->USDBRL->high;
    $reais = $usd * $cotacao;

    return 'R$ ' . number_format($reais, 2, ',', '.');
}

function moeda($get_valor)
{
    $source = ['.', ','];
    $replace = ['', '.'];
    $valor = str_replace($source, $replace, $get_valor);
    return $valor;
}

function pageCurrent()
{
    $url = $_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
    $url = explode('/', $url);
    if (isset($url[1]) && $url[1] != '') {
        $str = $url[1];
        if (strpos($str, '?') !== false) {
            $str = explode("?", $str);
            return $str[0];
        } else {
            return $url[1];
        }
    } else {
        return '';
    }
}

/**
 * This makes our life easier when dealing with paths. Everything is relative
 * to the application root now.
 */
chdir(dirname(__DIR__));

date_default_timezone_set('America/Sao_Paulo');

// Decline static file requests back to the PHP built-in webserver
if (php_sapi_name() === 'cli-server') {
    $path = realpath(__DIR__ . parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
    if (__FILE__ !== $path && is_file($path)) {
        return false;
    }
    unset($path);
}

// Composer autoloading
include __DIR__ . '/../vendor/autoload.php';

if (! class_exists(Application::class)) {
    throw new RuntimeException(
        "Unable to load application.\n"
        . "- Type `composer install` if you are developing locally.\n"
        . "- Type `vagrant ssh -c 'composer install'` if you are using Vagrant.\n"
        . "- Type `docker-compose run zf composer install` if you are using Docker.\n"
    );
}

// Retrieve configuration
$appConfig = require __DIR__ . '/../config/application.config.php';
if (file_exists(__DIR__ . '/../config/development.config.php.dist')) {
    function d($d)
    {
        echo '<pre>';
        var_dump($d);
        echo '</pre>';
        exit();
    }
    function met($d)
    {
        d(get_class_methods(get_class($d)));
    }
    $appConfig = ArrayUtils::merge($appConfig, require __DIR__ . '/../config/development.config.php.dist');
}

// Run the application!
Application::init($appConfig)->run();
