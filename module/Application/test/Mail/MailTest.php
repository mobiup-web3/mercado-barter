<?php

namespace ApplicationTest\Mail;

use Application\Mail\Mail;
use Mockery;
use PHPUnit\Framework\TestCase;
use User\Model\User;
use Laminas\Mail\Transport\Sendmail;
use Laminas\View\Renderer\PhpRenderer;

/**
 * Class MailTest
 * @package ApplicationTest\Mail
 *
 * @group Application
 * @group Mail
 */
class MailTest extends TestCase
{
    /**
     * @var Mail
     */
    private $mail;

    protected function setUp()
    {
        parent::setUp();
        $this->mail = new Mail($this->getTransport(), $this->getConfig(), $this->getView());
    }

    protected function tearDown()
    {
        parent::tearDown();
    }

    /**
     * @return \Mockery\MockInterface
     */
    public function getTransport()
    {
        $mockery = new Mockery();
        $transport = $mockery->mock(Sendmail::class);
        $transport->shouldReceive('send')->andReturn($transport);

        return $transport;
    }

    public function getConfig()
    {
        return [
            'connection_config' => [
                'from' => 'no-reply@domain.com'
            ]
        ];
    }

    public function getView()
    {
        $renderer = new PhpRenderer();
        return $renderer;
    }

    /**
     * @test
     */
    public function checkSetPage()
    {
        $result = $this->mail->setPage('xpto');
        $this->assertNotNull($result);
    }

    /**
     * @test
     */
    public function checkSetSubject()
    {
        $result = $this->mail->setSubject('xpto');
        $this->assertNotNull($result);
    }

    /**
     * @test
     */
    public function checkSetTo()
    {
        $result = $this->mail->setTo('test@test.com');
        $this->assertNotNull($result);
    }

    /**
     * @test
     */
    public function checkSetData()
    {
        $result = $this->mail->setData(['url' => 'http://localhost']);
        $this->assertNotNull($result);
    }

    /**
     * @test
     */
    public function checkRenderView()
    {
        $this->mail->setData(['url' => 'url']);
        $this->mail->setPage('test');
        $this->mail->setTo('test@test.com');
        $this->mail->setFrom('test@test.com');
        $this->mail->prepare('Application');
        $result = $this->mail->renderView('test', ['url' => 'url'], '', true, true);
        $this->assertNotNull($result);
    }

    /**
     * @test
     */
    public function checkPrepare()
    {
        $this->mail->setPage('test');
        $this->mail->setData(
            [
                'user' => new User([]),
                'url' => 'url'
            ]
        );
        $this->mail->setTo('test@test.com');
        // TODO: Fix content type error
//        $this->mail->addAttachment(__DIR__ . '/MailTest.php');
        $this->mail->setFrom('test@test.com');
        $result = $this->mail->prepare('Application', true, true);
        $this->assertNotNull($result);
    }

    /**
     * @test
     */
    public function checkPrepareWithInvalidFile()
    {
        $this->mail->setPage('test');
        $this->mail->setData(
            [
                'user' => new User([]),
                'url' => 'url'
            ]
        );
        $this->mail->setTo('teste@teste.com');
        $this->mail->setFrom('test@test.com');
        $this->mail->addAttachment(__DIR__);
        $result = $this->mail->prepare('Application', true, true);
        $this->assertNotNull($result);
    }

    /**
     * @test
     */
    public function checkSend()
    {
        $result = $this->mail->send();
        $this->assertNotNull($result);
    }

    /**
     * @test
     */
    public function checkSendFail()
    {
        $mockery = new Mockery();
        $transport = $mockery->mock(Sendmail::class);

        $mail = new Mail($transport, $this->getConfig(), $this->getView());
        $result = $mail->send();
        $this->assertNotNull($result);
    }

    /**
     * @test
     */
    public function checkAddAttachment()
    {
        $result = $this->mail->addAttachment(__DIR__);
        $this->assertInstanceOf(Mail::class, $result);

        $result2 = $this->mail->addAttachments([__DIR__]);
        $this->assertInstanceOf(Mail::class, $result2);

        $result3 = $this->mail->setAttachments([__DIR__]);
        $this->assertInstanceOf(Mail::class, $result3);
    }
}
