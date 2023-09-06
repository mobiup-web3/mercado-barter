<?php

namespace ApplicationTest\Db\TableGateway;

use Mockery\Mock;
use PHPUnit\Framework\TestCase;
use Laminas\Db\Adapter\Adapter;
use Laminas\Db\Adapter\Driver\Pdo\Pdo;
use Laminas\Db\ResultSet\ResultSet;
use Laminas\Db\TableGateway\TableGateway;

/**
 * Class CrudTableGatewayTest
 * @package ApplicationTest\Db\TableGateway
 *
 * @group Application
 * @group TableGateway
 */
class CrudTableGatewayTest extends TestCase
{
    /**
     * @var DumbTableGateway
     */
    protected $tableGateway;

    protected function setUp()
    {
        parent::setUp();

        $resultSet = \Mockery::mock(ResultSet::class);
        $resultSet->shouldReceive('current')
            ->andReturn(new \ArrayObject());

        $platform = \Mockery::mock(Pdo::class);

        $adapter = \Mockery::mock(Adapter::class);
        $adapter->shouldReceive('getPlatform')
            ->andReturn($platform);

        $tableGateway = \Mockery::mock(TableGateway::class);
        $tableGateway->shouldReceive('insert')
            ->andReturn(1);
        $tableGateway->shouldReceive('update')
            ->andReturn(1);
        $tableGateway->shouldReceive('delete')
            ->andReturn(1);
        $tableGateway->shouldReceive('select')
            ->andReturn($resultSet);
        $tableGateway->shouldReceive('getTable')
            ->andReturn('test_table');
        $tableGateway->shouldReceive('getResultSetPrototype')
            ->andReturn(new ResultSet());
        $tableGateway->shouldReceive('getAdapter')
            ->andReturn($adapter);
        $tableGateway->shouldReceive('selectWith')
            ->andReturn($resultSet);

        $this->tableGateway = new DumbTableGateway($tableGateway);
    }

    public function testInsertNewRegister()
    {
        $data = [
            'name' => 'test'
        ];

        $result = $this->tableGateway->insert($data);

        $this->assertInternalType('int', $result);
    }

    public function testInsertUpdateRegister()
    {
        $data = [
            'id' => 1,
            'name' => 'test'
        ];

        $result = $this->tableGateway->insert($data);

        $this->assertInternalType('int', $result);
    }

    public function testUpdate()
    {
        $data = [
            'name' => 'test'
        ];

        $result = $this->tableGateway->update($data, ['id' => 1]);

        $this->assertInternalType('int', $result);
    }

    public function testSelect()
    {
        $result = $this->tableGateway->select(['id' => 1]);

        $this->assertNotNull($result);
    }

    public function testGetTable()
    {
        $result = $this->tableGateway->getTable();

        $this->assertNotNull($result);
    }

    public function testDelete()
    {
        $result = $this->tableGateway->delete(1);

        $this->assertNotNull($result);
    }

    public function testFindOneBy()
    {
        $result = $this->tableGateway->findOneBy(['id' => 1]);

        $this->assertNotNull($result);
    }

    public function testFindOneByNotFound()
    {
        $resultSet = \Mockery::mock(ResultSet::class);
        $resultSet->shouldReceive('current')
            ->andReturn(null);

        $tableGateway = \Mockery::mock(TableGateway::class);
        $tableGateway->shouldReceive('select')
            ->andReturn($resultSet);
        $tableGateway->shouldReceive('selectWith')
            ->andReturn($resultSet);

        $tableGateway = new DumbTableGateway($tableGateway);

        $result = $tableGateway->findOneBy(['id' => 1]);

        $this->assertNull($result);
    }

    public function testFindAll()
    {
        $result = $this->tableGateway->findAll();

        $this->assertNotNull($result);
    }

    public function testFindAllPaginated()
    {
        $result = $this->tableGateway->findAll(true);

        $this->assertNotNull($result);
    }

    public function testFindBy()
    {
        $result = $this->tableGateway->findBy([]);

        $this->assertNotNull($result);
    }

    public function testFindByPaginated()
    {
        $result = $this->tableGateway->findBy([], true);

        $this->assertNotNull($result);
    }

    public function testFind()
    {
        $result = $this->tableGateway->find(1);

        $this->assertNotNull($result);
    }

    public function testFindWithoutResult()
    {
        $resultSet = \Mockery::mock(ResultSet::class);
        $resultSet->shouldReceive('current')
            ->andReturn(null);

        $tableGateway = \Mockery::mock(TableGateway::class);
        $tableGateway->shouldReceive('select')
            ->andReturn($resultSet);

        $tableGateway = new DumbTableGateway($tableGateway);

        $result = $tableGateway->find(1);

        $this->assertNull($result);
    }
}
