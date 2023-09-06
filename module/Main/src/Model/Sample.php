<?php

namespace Main\Model;

use Laminas\Hydrator\ClassMethodsHydrator as ClassMethods;
use Laminas\Hydrator\NamingStrategy\UnderscoreNamingStrategy;

class Sample
{
    private $id;
    private $email;
    private $code;
    private $validate;
    private $created_at;
    private $updated_at;

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $id
     */
    public function setId($id): Sample
    {
        $this->id = $id;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * @param mixed $email
     */
    public function setEmail($email): Sample
    {
        $this->email = $email;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getCode()
    {
        return $this->code;
    }

    /**
     * @param mixed $code
     */
    public function setCode($code): Sample
    {
        $this->code = $code;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getValidate()
    {
        return $this->validate;
    }

    /**
     * @param mixed $validate
     */
    public function setValidate($validate): Sample
    {
        $this->validate = $validate;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getCreatedAt()
    {
        return $this->created_at;
    }

    /**
     * @param mixed $created_at
     */
    public function setCreatedAt($created_at): Sample
    {
        $this->created_at = $created_at;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getUpdatedAt()
    {
        return $this->updated_at;
    }

    /**
     * @param mixed $updated_at
     */
    public function setUpdatedAt($updated_at): Sample
    {
        $this->updated_at = $updated_at;
        return $this;
    }

    /**
     * ValidationEmailCodePix constructor.
     * @param array $input
     * @throws \Exception
     */
    public function __construct($input = [])
    {
        if (! empty($input)) {
            $this->exchangeArray($input);
        }
    }

    /**
     * @param $input
     * @throws \Exception
     */
    public function exchangeArray($input)
    {
        if (isset($input['created_at']) && ! $input['created_at'] instanceof DateTime) {
            $input['created_at'] = new \DateTime($input['created_at']);
        }

        $hydrator = new ClassMethods(false);
        $hydrator->setNamingStrategy(new UnderscoreNamingStrategy());
        $hydrator->hydrate($input, $this);
    }
}
