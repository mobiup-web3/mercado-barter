<?php declare(strict_types=1);

namespace Application\View\Helper;

/**
 * Class ExceptionTelegramViewHelper
 * @package Application\View\Helper
 */
class ExceptionTelegramViewHelper
{
    public function __invoke($content)
    {
        $content = $this->appendRequestDetails($content);

        $config = require __DIR__ . '/../../../../../config/autoload/telegram.global.php';
        if (is_file(__DIR__ . '/../../../../../config/autoload/telegram.local.php')) {
            $config = require __DIR__ . '/../../../../../config/autoload/telegram.local.php';
        }

        $telegramConfig = $config['telegram']['exception_reporting'];

        $endpoint = $telegramConfig['endpoint'] . $telegramConfig['bot'] . '/sendMessage';

        $data = [
            'chat_id' => $telegramConfig['chat_id'],
            'text' => substr($telegramConfig['env'] . " - Erro\r\n\r\n" . htmlentities(str_replace(['<br>', '<br/>', '<br />'], "\r\n", $content)), 0, 4096),
            'parse_mode' => 'html'
        ];

        $ch = curl_init($endpoint);
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Accept: application/json']);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);

        curl_exec($ch);
        curl_close($ch);
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
            $content .= 'Dados (GET/POST/PUT): <br />' . print_r($_REQUEST, true) . '<br />';
        }

        return $content;
    }
}
