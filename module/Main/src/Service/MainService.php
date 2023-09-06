<?php

namespace Main\Service;

use Application\Mail\Mail;

class MainService
{
    private $mail;
    private $emailConfig;

    public function __construct(Mail $mail, array $emailConfig)
    {
        $this->mail         = $mail;
        $this->emailConfig  = $emailConfig;
    }
}
