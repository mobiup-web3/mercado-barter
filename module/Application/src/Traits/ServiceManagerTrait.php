<?php

namespace Application\Traits;

//use Laminas\Mvc\Controller\AbstractController;
use Aws\Result;
use Laminas\Mvc\Controller\AbstractController;
use PhpParser\Node\Scalar\String_;

/**
 * Trait ServiceManagerTrait
 * @package Application\Traits
 */
trait ServiceManagerTrait
{
    /**
     * @return \Laminas\ServiceManager\ServiceLocatorInterface
     */
    protected function getServiceManager()
    {
        if (! $this instanceof AbstractController) {
            throw new \RuntimeException('This trait is only useful in controllers');
        }

        return $this->getEvent()->getApplication()->getServiceManager();
    }

    /**
     * Get UUID V4 36 bytes
     * @return String
     */
    protected function getV4uuid()
    {
        return sprintf('%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
            mt_rand(0, 0xffff), mt_rand(0, 0xffff),
            mt_rand(0, 0xffff),
            mt_rand(0, 0x0fff) | 0x4000,
            mt_rand(0, 0x3fff) | 0x8000,
            mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)
        );
    }

    /**
     * Change Date format from US to PT-BR
     * @param $usdate
     * @return String
     */
    protected function formatDataBr($usdate)
    {
        if ($usdate != "") {
            $dt     = explode(' ', $usdate);
            $date   = $dt[0];
            $time   = $dt[1];
            $dte    = explode('-', $date);
            $dtbr   = $dte[2].'/'.$dte[1].'/'.$dte[0].' '.$time;

            return $dtbr;
        }
    }

    /**
     * Change Date format from PT-BR to US
     * @param $ptbrdate
     * @return String
     */
    protected function formatDataUs($ptbrdate)
    {
        $dt = explode(' ',$ptbrdate);
        $date = $dt[0];
        $time = $dt[1];
        $dte = explode('/',$date);
        $dtus = $dte[2].'-'.$dte[1].'-'.$dte[0].' '.$time;

        return $dtus;
    }

}
