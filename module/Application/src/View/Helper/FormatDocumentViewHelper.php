<?php declare(strict_types=1);

namespace Application\View\Helper;

use Application\Types\Cnpj;
use Application\Types\Cpf;

/**
 * Class FormatCnpjViewHelper
 * @package Application\View\Helper
 */
class FormatDocumentViewHelper
{

    public function __invoke($document)
    {
        $document = preg_replace("/\D/", '', $document);

        if (strlen($document) == 11) {
            $document = new Cpf($document);
        } else {
            $document = new Cnpj($document);
        }

        return $document->masked();
    }
}
