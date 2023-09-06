# SVM

## Padrões de protocolos para este projeto

401 = Token inválido / assinatura inválida
404 = Página não encontrada / rota inválida
200 = Sucesso
201 = Sucesso/criação (retorno vai vir lista ou objeto atualizado)
400 = Bad request / solicitação inválida
500 = Server error / estamos em manutenção. volte mais tarde

## Migrations

### Rodando pela primeira vez

Ao clonar o projeto você deve rodar o comando `./bin/app migration apply`. Isso fará com que todas as migrações 
disponíveis sejam aplicadas ao seu banco de dados.


### Ao receber uma nova migração

Basta utilizar o mesmo comando exibido acima, `./bin/app migration apply`.


### Revertendo uma migração

Caso exista a necessidade de reverter alguma migração, basta rodar um comando informando a migração deseja.

```shell
./bin/app migration apply 20190429234737 --down --force`
```

Note que o comando é o mesmo, porém seguido do identificador da migração, com um parâmetro para reversão (--down)
e outro para forçar a execução (--force).


### Criando uma migração

Existe um comando que cria um novo arquivo de migração com a estrutura para o futuro preenchimento.

```shell
./bin/app migration generate
```

O arquivo será criado em `./data/migrations` e terá esta estrutura:

```php
<?php

namespace ZfSimpleMigrations\Migrations;

use ZfSimpleMigrations\Library\AbstractMigration;
use Laminas\Db\Metadata\MetadataInterface;

class Version20190430003751 extends AbstractMigration
{
    public static $description = "Migration description";

    public function up(MetadataInterface $schema)
    {
        //$this->addSql(/*Sql instruction*/);
    }

    public function down(MetadataInterface $schema)
    {
        //throw new \RuntimeException('No way to go down!');
        //$this->addSql(/*Sql instruction*/);
    }
}
```

Feito isto, basta preencher os dados nos métodos **up** e **down** que ao rodar o `migration apply`
os mesmos são executados.

Para mais exemplos, veja as migrações que já estão [aqui](data/migrations).


### Outras opções

Você pode ver tudo que é possível de fazer com as migrações apenas usando o comando `./bin/app`.

------


