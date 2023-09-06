<?php

namespace Application\Db\TableGateway;

use Application\Model\ModelInterface;
use ArrayObject;
use Laminas\Db\ResultSet\ResultSet;
use Laminas\Db\Sql\Expression;
use Laminas\Db\Sql\Select;
use Laminas\Db\Sql\Sql;
use Laminas\Db\Sql\Where;
use Laminas\Db\TableGateway\TableGateway;
use Laminas\Db\TableGateway\TableGatewayInterface;
use Laminas\Paginator\Adapter\AdapterInterface;
use Laminas\Paginator\Adapter\DbSelect;
use Laminas\Paginator\Paginator;

/**
 * Class CrudTableGateway
 * @package Application\Db\TableGateway
 */
abstract class CrudTableGateway implements TableGatewayInterface, AdapterInterface
{
    /**
     * @var TableGateway
     */
    protected $tableGateway;

    /**
     * @var string
     */
    protected $table;

    /**
     * @var ModelInterface
     */
    protected $objectPrototype;

    /**
     * @var array
     */
    protected $items = [];

    public function __construct(TableGateway $tableGateway)
    {
        $this->tableGateway = $tableGateway;
    }

    /**
     * @param bool $paginated
     * @param bool $onlyActive
     * @param array $order
     * @return ResultSet|Paginator
     */
    public function findAll($paginated = false, $onlyActive = false, $order = [])
    {
        $criteria = [];

        if ($onlyActive) {
            $criteria = [
                'active' => true
            ];
        }

        return $this->findBy($criteria, $paginated, $order);
    }

    /**
     * @param int $id
     * @return array|ArrayObject|null
     */
    public function find($id)
    {
        /** @var ResultSet $rowset */
        $rowset = $this->tableGateway->select(['id' => $id]);
        $row = $rowset->current();
        if ($row) {
            return $row;
        }

        return null;
    }

    /**
     * @param $criteria
     * @param bool $paginated
     * @param array $order
     * @param int $limit
     * @return ResultSet|Paginator
     */
    public function findBy($criteria, $paginated = false, $order = [], $limit = 0)
    {
        // create a new Select object for the current table
        $select = new Select($this->tableGateway->getTable());

        $lessThan = [];
        if (isset($criteria['less_than'])) {
            $lessThan = $criteria['less_than'];
            unset($criteria['less_than']);

            $predicate = new Where();
            $select->where($predicate->lessThanOrEqualTo($lessThan['left'], $lessThan['right']));
        }
        $select->where($criteria);

        if (!empty($order)) {
            $select->order($order);
        }

        if ($paginated) {
            // create a new result set based on the current model
            $arrayObjectPrototype = $this->tableGateway
                ->getResultSetPrototype()
                ->getArrayObjectPrototype();
            $resultSetPrototype = new ResultSet();
            $resultSetPrototype->setArrayObjectPrototype($arrayObjectPrototype);

            // create a new pagination adapter object
            $paginatorAdapter = new DbSelect(
                $select,
                $this->tableGateway->getAdapter(),
                $resultSetPrototype
            );
            $paginator = new Paginator($paginatorAdapter);

            return $paginator;
        }

        if ($limit > 0) {
            $select->limit($limit);
        }

        return $this->tableGateway->selectWith($select);
    }

    /**
     * @param $criteria
     * @param array $order
     * @return array|ArrayObject|null
     */
    public function findOneBy($criteria, $order = [])
    {
        $select = new Select($this->tableGateway->getTable());
        foreach ($criteria as $field => $value) {
            $select->where($field . '= "' . $value . '"');
        }

        if (!empty($order)) {
            foreach ($order as $field => $orderItem) {
                $select->order($field . ' ' . $orderItem);
            }
        }

        /** @var ResultSet $rowset */
        $rowset = $this->tableGateway->selectWith($select);
        $row = $rowset->current();

        if ($row) {
            return $row;
        }

        return null;
    }

    /**
     * @param $criteria
     * @param array $order
     * @return array|ArrayObject|null
     */
    public function findAllWhere($criteria, $order = [])
    {
        $select = new Select($this->tableGateway->getTable());
        foreach ($criteria as $field => $value) {
            if ($field == 'tentativas_reenvio') {
                $select->where($field . ' < ' . $value . '');
            } else {
                $select->where($field . '= "' . $value . '"');
            }
        }

        if (!empty($order)) {
            foreach ($order as $field => $orderItem) {
                $select->order($field . ' ' . $orderItem);
            }
        }

        /** @var ResultSet $rowset */
        $rowset = $this->tableGateway->selectWith($select);

        $rows = [];
        $count = 0;

        foreach ($rowset as $row) {
            $rows[$count] = $row;
            $count++;
        }

        if (count($rows) > 0) {
            return $rows;
        }

        return null;
    }

    public function findAllArray($order = [], $limit = false)
    {
        $select = new Select($this->tableGateway->getTable());

        if (!empty($order)) {
            foreach ($order as $field => $orderItem) {
                $select->order($field . ' ' . $orderItem);
            }
        }

        if ($limit > 0) {
            $select->limit($limit);
        }

        /** @var ResultSet $rowset */
        $rowset = $this->tableGateway->selectWith($select);

        $rows = [];
        $count = 0;

        foreach ($rowset as $row) {
            $rows[$count] = $row;
            $count++;
        }

        if (count($rows) > 0) {
            return $rows;
        }

        return null;
    }


    /**
     * @param $field
     * @return array|ArrayObject|null
     */
    public function findAllLike($field, $like, $criteria = null, $order = null, $limit = 0, $offset = 0, $filter_date = null)
    {
        $select = new Select($this->tableGateway->getTable());

        $where = new Where();

        if($like != '') {
            $where->like($field, '%' . $like . '%');
        }
      //  $where->like('name', '%' . $q . '%');

        if (!is_null($criteria)) {
            foreach ($criteria as $field => $value) {
                $where->and->equalTo($field, $value);
            }
        }

        if (!is_null($filter_date)) {
            foreach ($filter_date as $field => $value) {
                $where->and->greaterThanOrEqualTo($field, $value);
            }
        }

        $select->where($where);

        if (!empty($order)) {
            foreach ($order as $field => $orderItem) {
                $select->order($field . ' ' . $orderItem);
            }
        }

        if ($limit > 0) {
            $select->limit($limit);

        }
        if ($offset > 0) {
            $select->offset($offset);
        }

        /** @var ResultSet $rowset */
        $rowset = $this->tableGateway->selectWith($select);

        $rows = [];
        $count = 0;

        foreach ($rowset as $row) {
            $rows[$count] = $row;
            $count++;
        }

        if (count($rows) > 0) {
            return $rows;
        }

        return null;
    }


    /**
     * @param int $id
     * @return int
     */
    public function delete($id)
    {
        return $this->tableGateway->delete(['id' => $id]);
    }

    /**
     * @param $field
     * @param $value
     * @return int
     */
    public function deleteByFieldAndValue($field, $value)
    {
        return $this->tableGateway->delete([$field => $value]);
    }

    /**
     * @param $criteria
     * @return bool
     */
    public function deleteAllBy($criteria)
    {
        $registers = $this->findBy($criteria);
        if ($registers) {
            foreach ($registers as $register) {
                if (is_array($register)) {
                    $id = $register['id'];
                } else {
                    $id = $register->getId();
                }

                $this->delete($id);
            }
        }

        return true;
    }

    public function getTable()
    {
        return $this->tableGateway->getTable();
    }

    public function select($where = null)
    {
        return $this->tableGateway->select($where);
    }

    public function update($set, $where = null)
    {
        return $this->tableGateway->update($set, $where);
    }

    public function insert($set)
    {
        $id = 0;
        if (isset($set['id'])) {
            $id = (int)$set['id'];
            unset($set['id']);
        }

        if ($id === 0) {
            return $this->tableGateway->insert($set);
        }

        return $this->tableGateway->update($set, ['id' => $id]);
    }

    public function beginTransaction()
    {
        $connection = $this->tableGateway
            ->getAdapter()
            ->getDriver()
            ->getConnection();

        $connection->beginTransaction();
    }

    public function rollback()
    {
        $connection = $this->tableGateway
            ->getAdapter()
            ->getDriver()
            ->getConnection();

        $connection->rollback();
    }

    /**
     * @return TableGateway
     */
    public function getTableGateway()
    {
        return $this->tableGateway;
    }

    /**
     * @return int
     */
    public function count()
    {
        return count($this->items);
    }

    /**
     * @param int $offset
     * @param int $itemCountPerPage
     * @return array
     */
    public function getItems($offset, $itemCountPerPage)
    {
        return array_slice($this->items, $offset, $itemCountPerPage);
    }

    /**
     * @param array $criteria
     * @return int
     */
    public function countBy(array $criteria)
    {
        $select = new Select();
        $select->from($this->tableGateway->getTable());

        foreach ($criteria as $field => $crit) {
            if (!is_array($crit)) {
                if (is_int($crit)) {
                    $select->where("`" . $field . "`=" . $crit);
                } elseif (is_bool($crit)) {
                    if ($crit == true) {
                        $crit = 1;
                    } else {
                        $crit = 0;
                    }
                    $select->where("`" . $field . "`=" . $crit);
                } else {
                    $select->where("`" . $field . "`='$crit'");
                }
            } elseif (is_array($crit)) {
                $critString = $crit['value'];
                if ($crit['operator'] == 'BETWEEN') {
                    $critString = $crit['value'][0] . "' AND '" . $crit['value'][1];
                }
                $select->where('`' . $field . '` ' . $crit['operator'] . " '$critString'");
            }
        }

        $sql = new Sql($this->getTableGateway()->getAdapter());

        $statement = $sql->prepareStatementForSqlObject($select);
        $results = $statement->execute();
        $resultSet = new ResultSet();
        $resultSet->initialize($results);

        return $resultSet->count();
    }

    /**
     * @param $field
     * @param array $criteria
     * @return float
     */
    public function sumBy($field, array $criteria)
    {
        $select = new Select();
        $select->columns(['sum' => new Expression('SUM(' . $field . ')')]);
        $select->from($this->table);

        foreach ($criteria as $field => $crit) {
            if (!is_array($crit)) {
                $select->where($field . "='$crit'");
            } elseif (is_array($crit)) {
                $critString = $crit['value'];
                if ($crit['operator'] == 'BETWEEN') {
                    $critString = $crit['value'][0] . "' AND '" . $crit['value'][1];
                }
                $select->where($field . ' ' . $crit['operator'] . " '$critString'");
            }
        }

        $sql = new Sql($this->getTableGateway()->getAdapter());

        $statement = $sql->prepareStatementForSqlObject($select);
        $results = $statement->execute();
        $resultSet = new ResultSet();
        $resultSet->initialize($results);

        $sum = $resultSet->current()['sum'];

        return (float)number_format($sum, 2, '.', '');
    }

    /**
     * @param int $days
     * @return string
     */
    protected function getDateDays($days)
    {
        $date = new \DateTime();
        $date->sub(new \DateInterval('P' . $days . 'D'));

        return $date->format('Y-m-d') . ' 00:00:00';
    }

    /**
     * @param int $cnpjCpf
     * @return string
     */
    protected function formatarCnpj($cnpjCpf)
    {
        if (strlen(preg_replace("/\D/", '', $cnpjCpf)) === 11) {
            $response = preg_replace("/(\d{3})(\d{3})(\d{3})(\d{2})/", "\$1.\$2.\$3-\$4", $cnpjCpf);
        } else {
            $response = preg_replace("/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/", "\$1.\$2.\$3/\$4-\$5", $cnpjCpf);
        }

        return $response;
    }
}
