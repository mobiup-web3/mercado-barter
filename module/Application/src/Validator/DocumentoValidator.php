<?php

namespace Application\Validator;

use Laminas\Validator\AbstractValidator;

/**
 * Class DocumentoValidator
 * @package Application\Validator
 */
class DocumentoValidator extends AbstractValidator
{
    const INVALID = 'invalid';

    /**
     * @var array
     */
    protected $messageTemplates = [
        self::INVALID => "Documento inválido"
    ];

    /**
     * @param mixed $documento
     * @return bool
     */
    public function isValid($documento)
    {
        if (! is_scalar($documento)) {
            $this->error(self::INVALID);
            return false;
        }

        if (strlen($documento) === 11) {
            return $this->validaCpf($documento);
        }

        return $this->validaCnpj($documento);
    }

    /**
     * @param $cpf
     * @return bool
     */
    private function validaCpf($cpf)
    {
        $invalids = [
            '00000000000',
            '11111111111',
            '22222222222',
            '33333333333',
            '44444444444',
            '55555555555',
            '66666666666',
            '77777777777',
            '88888888888',
            '99999999999'
        ];

        if (in_array($cpf, $invalids)) {
            $this->error(self::INVALID);
            return false;
        }

        for ($t = 9; $t < 11; $t++) {
            for ($d = 0, $c = 0; $c < $t; $c++) {
                $d += $cpf[$c] * (($t + 1) - $c);
            }
            $d = ((10 * $d) % 11) % 10;
            if ($cpf[$c] != $d) {
                $this->error(self::INVALID);
                return false;
            }
        }

        return true;
    }

    /**
     * @param $document
     * @return bool
     */
    private function validaCnpj($document)
    {
        $cnpj = str_pad($document, 14, '0', STR_PAD_LEFT);

        $invalids = [
            '00000000000000',
            '11111111111111',
            '22222222222222',
            '33333333333333',
            '44444444444444',
            '55555555555555',
            '66666666666666',
            '77777777777777',
            '88888888888888',
            '99999999999999'
        ];

        if (in_array($cnpj, $invalids)) {
            $this->error(self::INVALID);
            return false;
        }

        $j = 5;
        $k = 6;
        $soma1 = "";
        $soma2 = "";

        for ($i = 0; $i < 13; $i++) {
            $j = $j == 1 ? 9 : $j;
            $k = $k == 1 ? 9 : $k;

            $soma2 += ($cnpj[$i] * $k);

            if ($i < 12) {
                $soma1 += ($cnpj[$i] * $j);
            }

            $k--;
            $j--;
        }

        $digito1 = $soma1 % 11 < 2 ? 0 : 11 - $soma1 % 11;
        $digito2 = $soma2 % 11 < 2 ? 0 : 11 - $soma2 % 11;

        $result = (($cnpj[12] == $digito1) and ($cnpj[13] == $digito2));

        if (! $result) {
            $this->error(self::INVALID);
            return false;
        }

        return true;
    }
}
