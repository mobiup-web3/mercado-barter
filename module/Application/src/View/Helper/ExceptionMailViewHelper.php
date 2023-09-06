<?php declare(strict_types=1);

namespace Application\View\Helper;

use Application\Mail\Mail;
use Laminas\Mail\Transport\Smtp;
use Laminas\Mail\Transport\SmtpOptions;
use Laminas\View\Renderer\PhpRenderer;
use Laminas\View\Resolver\TemplatePathStack;

/**
 * Class ExceptionMailViewHelper
 * @package Application\View\Helper
 */
class ExceptionMailViewHelper
{
    public function __invoke($content)
    {
        return true;
        $emailConfig = require __DIR__ . '/../../../../../config/autoload/mail.global.php';
        $content = $this->appendRequestDetails($content);

        $smtpOptions = new SmtpOptions($emailConfig['mail']);
        $transport = new Smtp($smtpOptions);
        $renderer = new PhpRenderer();
        $resolver = new TemplatePathStack();
        $resolver->setPaths([__DIR__ . '/../../../view']);
        $renderer->setResolver($resolver);

        if (php_sapi_name() == 'cli-server') {
            $env = 'LOCAL';
        } else {
            $host = isset($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : '';
            switch ($host) {
                case 'sr.mobiup.com.br':
                case 'pagamentoeletronico.sorocabarefrescos.com.br':
                    $env = 'PROD';
                    break;
                case 'sr.qa.mobiup.com.br':
                    $env = 'QA';
                    break;
                default:
                    $env = 'DEV';
                    break;
            }
        }

        $mail = new Mail($transport, $emailConfig, $renderer, 'contact');

        $mail->setTo('andrecardosodev@gmail.com')
            ->setFrom('noreply@sr.mobiup.com.br')
            ->setSubject('### Erro SR - ' . $env . ' ###')
            ->setPage('error')
            ->setData(['content' => $content])
            ->prepare()
            ->send();
    }

    /**
     * @param $content
     * @return string
     */
    private function appendRequestDetails($content)
    {
        $content .= '<br /><br />';
        if (isset($_SERVER['REQUEST_URI'])) {
            $content .= 'URI: ' . $_SERVER['REQUEST_URI'] . '<br />';
        }

        if (isset($_REQUEST)) {
            $content .= 'Dados (GET/POST/PUT): <br /><pre>' . print_r($_REQUEST, true) . '</pre><br />';
        }

        return $content;
    }
}
