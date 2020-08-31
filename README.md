# Posting

## O que é o Posting?

Posting é uma ORM simples, baseada no módulo [pg](https://www.npmjs.com/package/pg) para conexão com Bancos de Dados PostgreSQL.

O Posting é indicado para projetos com modelos de dados simples, pois não realiza validações prévias de dados, deixando essa implementação por parte do desenvolvedor que opte pelo seu uso.

## Instalação

    $ npm install posting

## Documentação


### Classe Posting

#### Descrição
A classe Posting é uma classe destinada à prover informações importantes acerca de outras classes que compõem o modelo de dados do programa que está utilizando as funcionalidades do Posting ORM. Assim, quando se deseja utilizar as características fornecidas pela classe Posting, basta que sua classe a herde.

#### Atributos

##### _Auto

###### Descrição
Este atributo é utilizado pelo Posting ORM para identificar os atributos que correspondem à campos de tabelas cujo preenchimento é realizado de forma automática pelo banco de dados. Um exemplo deste tipo de campo pode ser o campo destinado a uma chave primária sequencial. Considerando esse exemplo, no momento de uma inserção, os valores de tais atributos nao devem ser informados na query de inserção. Assim, o atributo _Auto, quando preenchido, deve conter um array onde cada elemento é uma string com o nome do atributo automático.

###### Cuidados para o uso
O nome _Auto deve estar reservado para o propósito descrito e não ser usado de outra forma, para garantir o funcionamento correto da ORM.

###### Exemplos
Para exemplos, consulte a Documentação de insertObject e updateObject.

##### _Key

###### Descrição
Este atributo é utilizado pelo Posting ORM para identificar os atributos chaves de uma classe, destinados à identificar seu registro correspondente em uma tabela do banco de dados para operações de atualização e deleção.

###### Cuidados para o uso
O nome _Key deve estar reservado para o propósito descrito e não ser usado de outra forma. Além disso, é recomendado que os atributos chaves de uma classe sejam fixos e seus valores, uma vez preenchidos, não sejam alterados para garantir, assim, a integridade dos dados armazenados no banco de dados Postgres.

###### Exemplos
Para exemplos, consulte a Documentação de updateObject e deleteObject.

#### Métodos

##### setAuto(...values)

###### Descrição
Este método é usado para preencher o atributo _Auto, e recebe como parâmetro uma lista de strings, onde cada uma é o nome de um atributo de preenchimento automático. Caso o atributo passado entre os parâmetros não exista na classe, ele será desconsiderado.

###### Cuidados para o uso
Recomendamos que este método seja utilizado no contrutor da classe herdeira de Posting.

###### Exemplos
Para exemplos, consulte a Documentação de insertObject.

##### setKey(...values)

###### Descrição
Este método é usado para preencher o atributo _Key, e recebe como parâmetro uma lista de strings, onde cada uma é o nome de um atributo chave. Caso o atributo passado entre os parâmetros não exista na classe, ele será desconsiderado. 

###### Cuidados para o uso
Recomendamos que este método seja utilizado no contrutor da classe herdeira de Posting.

###### Exemplos
Para exemplos, consulte a Documentação de updateObject e deleteObject.


### getConnection

#### Descrição
A função getConnection estabelece uma conexão com um banco de dados Postgres à partir das informações de conexão disponiblizadas no arquivo postingConfig.js no diretório raiz de seu projeto Node (o mesmo diretório do arquivo package.json), ou no mesmo diretório do arquivo fonte getConnection.js ou no objeto de configuração passado como segundo parâmetro da função. Caso a conexão consiga ser estabelecida sem erros, a função invoca uma callback, passando-lhe como primeiro argumento o objeto client instanciado para a conexão. Caso haja falha no momento da conexão, a callback será invocada recebedo o erro ocorrido como segundo parâmetro.

#### Cuidados para o uso
É importante ressaltar a necessidade do arquivo postingConfig.js no mesmo diretório do arquivo getConnection.js ou na raiz do projeto Node caso não seja passado nenhum objeto de configuração como segundo parâmetro da função. O arquivo postingConfig.js deve exportar de seu módulo um objeto contendo os atributos necessários para estabelecimento da conexão, conforme exemplo abaixo:

    module.exports = {
        user: 'user',
        host: 'host',
        database: 'database',
        password: 'password',
        port: 5432 //your port
    }

Além disso, a função getConnection estabelece uma conexão mas não a encerra, ficando de responsabilidade do usuário a liberação do recurso com o método end() da classe Client.

#### Exemplos

    const orm = require('posting')

    orm.getConnection((client, error) => {
        if(!error)
        {
            client.query('SELECT 1 as NUMERO', (err, res) => {
                
                if (!err)
                {
                    console.log('Query ok...')
                }
                else 
                {
                    console.log('Erro na query...')
                }   

                client.end()
            }
        }
    }) // Se o segundo parâmetro é omitido, a função buscará pelo arquivo postingConfig.js 

    orm.getConnection((client, error) => {
        if(!error)
        {
            client.query('SELECT 1 as NUMERO', (err, res) => {
                if (!err)
                {
                    console.log('Query ok...')
                }
                else 
                {
                    console.log('Erro na query...')
                }     
                client.end()
            })
        }
    }, {
        user: 'user',
        host: 'localhost',
        database: 'database',
        password: 'password'
        port: 5432
    }) // Quando o segundo parâmetro é informado, ele tem preferência sobre o arquivo postingConfig.js


### getObject

#### Descrição
A função getObject realiza uma consulta simples em um banco de dados Postgres, em busca de um único registro. O parâmetro "instance" deve ser um objeto contendo os atributos e os valores conhecidos para a consulta. Caso a consulta consiga ser realizada, a função invoca uma callback passando-lhe o objeto resultante da consulta (ou nulo caso nenhum registro seja encontrado). Caso algum erro ocorra, a callback ainda será invocada, e receberá o erro ocorrido no segundo parâmetro. O terceiro parâmetro onConfig é opcional e, caso usado, deve ser um objeto contento as informações necessárias para estabelecimento da conexão. Caso o parâmetro onConfig seja omitido, a função utilizará as informações contidas no arquivo postingConfig.js (veja a documentação de getConnection.

#### Cuidados para o uso
É importante que o objeto passado como primeiro parâmetro seja uma instância de uma classe cujo nome seja o mesmo nome da tabela do banco de dados em que a busca será realizada. Essa classe deve conter atributos com os mesmos nomes dos campos da tabela em que a busca será realizada. Somente os valores dos atributos que não sejam nulos ou indefinidos são aproveitados para a consulta. Caso a consulta retorne mais de um registro, somente o primeiro será retornado para a callback e os demais serão desconsiderados.

#### Exemplos

    const orm = require('posting')

    class Pessoa
    {
        constructor(id = null, nome = null)
        {
            this.id = id
            this.nome = nome
        }
    }

    orm.getObject(new Pessoa(1, null, null), (res, err) => {
        if(!err)
        {
            console.log(res)
        }
    }) // Query executada: select * from pessoa where id = 1

    class Aluno
    {
        constructor(matricula = null, nome = null, curso = null)
        {
            this.matricula = matricula
            this.nome = nome
            this.curso = curso
        }
    }

    orm.getObject(new Aluno(null, 'Raphael', 'Administração'), (res, err) => {
        if(!err)
        {
            console.log(res)
        }
    }) // Query executada: select * from aluno where nome = 'Raphael' and curso = 'Administração'


### getAsync

#### Descrição
A função getAsync realiza a chamada da função getObject no formato de Promise. O parâmetro instance da função getAsync será passado para o parâmetro instance da função getObject, assim como o parâmetro opcional onConfig da função getAsync será passado para o parâmetro onConfig da função getObject. Para mais detalhes acerca dos parâmetros instance e onConfig, consulte a documentação de getObject. Caso a função getObject consiga ser executada sem erros, a Promise de getAsync será resolvida, recebendo o objeto encontrado na busca de getObject. Caso algum erro ocorra na execução de getObject, a Promise de getAsync será rejeitada, recebendo o erro ocorrido.

#### Cuidados para o uso
O parâmetro instance e o parâmetro onConfig de getAsync são os mesmo de getObject. Consulte a documentação de getObject para mais detalhes acerca destes parâmetros.

#### Exemplos

    const orm = require('posting')

    class Pessoa
    {
        constructor(id = null, nome = null)
        {
            this.id = id
            this.nome = nome
        }
    }

    orm.getAsync(new Pessoa(1, null))
        .then(resp => console.log(resp))
        .catch(error => console.log(error)) // Query executada: select * from pessoa where id = 1


### getObjects

#### Descrição
A função getObjects realiza uma consulta simples em um banco de dados Postgres, em busca um ou mais registros que correspondem à instância passada. O parâmetro "instance" deve ser um objeto contendo os atributos e os valores conhecidos para a consulta. Caso a consulta consiga ser realizada, a função invoca uma callback passando-lhe um array com o(s) objeto(s) resultante(s) da consulta (ou um array vazio caso nenhum registro seja encontrado). Caso algum erro ocorra, a callback ainda será invocada, e receberá o erro ocorrido no segundo parâmetro. O terceiro parâmetro onConfig é opcional e, caso usado, deve ser um objeto contento as informações necessárias para estabelecimento da conexão. Caso o parâmetro onConfig seja omitido, a função utilizará as informações contidas no arquivo postingConfig.js (veja a documentação de getConnection).

#### Cuidados para o uso
É importante que o objeto passado como primeiro parâmetro seja uma instância de uma classe cujo nome seja o mesmo nome da tabela do banco de dados em que a busca será realizada. Essa classe deve conter atributos com os mesmos nomes dos campos da tabela em que a busca será realizada. Somente os valores dos atributos que não sejam nulos ou indefinidos são aproveitados para a consulta.

#### Exemplos

    const orm = require('posting')

    class Pessoa
    {
        constructor(id = null, nome = null)
        {
            this.id = id
            this.nome = nome
        }
    }

    orm.getObjects(new Pessoa(), (res, err) => {
        
        if (!err) 
        {    
            console.log(res)
        }
    }) // Query executada: select * from pessoa

    class Aluno
    {
        constructor(matricula = null, nome = null, curso = null)
        {
            this.matricula = matricula
            this.nome = nome
            this.curso = curso
        }
    }

    orm.getObjects(new Aluno(null, 'Raphael', 'Administração'), (res, err) => {
        
        if (!err)
        {
            console.log(res)
        }
    }) // Query executada: select * from aluno where nome = 'Raphael' and curso = 'Administração'


### getsAsync

#### Descrição
A função getsAsync realiza a chamada da função getObjects no formato de Promise. O parâmetro instance da função getsAsync será passada para o parâmetro instance da função getObjects, assim como o parâmetro opcional onConfig da função getsAsync será passado para o parâmetro onConfig da função getObjects. Para mais detalhes acerca dos parâmetros instance e onConfig, consulte a documentação de getObjects. Caso a função getObjects consiga ser executada sem erros, a Promise de getsAsync será resolvida, recebendo a coleção encontrada na busca de getObjects. Caso algum erro ocorra na execução de getObjects, a Promise de getsAsync será rejeitada, recebendo o erro ocorrido.

#### Cuidados para o uso
O parâmetro instance e o parâmetro onConfig de getAsync são os mesmo de getObjects. Consulte a documentação de getObjects para mais detalhes acerca destes parâmetros.

#### Exemplos

    const orm = require('posting')

    class Pessoa
    {
        constructor(id = null, nome = null)
        {
            this.id = id
            this.nome = nome
        }
    }

    orm.getsAsync(new Pessoa())
        .then(resp => console.log(resp))
        .catch(error => console.log(error)) // Query executada: select * from pessoa


### getGeneric

#### Descrição
A função getGeneric realiza a execução de uma query genérica em um banco de dados Postgres. O parâmetro query deve receber exatamente a query a ser executada. O parâmetro values deve receber um array contendo os valores que devem ser utilizados em uma query parametrizada, ou nulo, caso não exista nenhum. Caso a operação seja bem sucedida, a callback declarada no terceiro parâmetro é invocada, recebendo como parâmetro um array de objetos genéricos, onde cada objeto representa uma linha da resposta da query executada, caso exista. Em caso de erro, a callback ainda será invocada, recebendo como segundo parâmetro o erro ocorrido. O parâmetro onConfig é opcional e, caso preenchido, deve conter o objeto com os dados necessários para estabelecimento da conexão. Caso onConfig seja omitido, serão utilizadas as informações contidas no arquivo postingConfig.js para estabelecimento da conexão (veja a documentação de getConnection). 

#### Cuidados para o uso
Como Posting ORM é baseado no pacote node-postgres (pg), é possível passar uma query parametrizada para ser executada através da função getGeneric utilizando a sintaxe "$x" para indicar os locais da query que deverão ser substituídos pelos valores a serem passados como segundo parâmetro da função, para evitar, dessa forma, tentativas de ataques em sua aplicação por meio de SQL Injection, como será demonstrado na sessão Exemplos de Uso deste documento. Para maiores informações sobre o pacote node-postgres, consulte documentação disponível na sessão Referências deste documento. É importante ressaltar que, caso a query informada no primeiro parâmetro não seja uma query parametrizada, basta preencher o segundo parâmetro com "null" ou com um array vazio ("[]"), para evitar erros durante a tentativa de execução da query. Além disso, a callback invocada após a execução da query sempre receberá como parâmetro um array, mesmo que a query executada não possua uma resposta.

#### Exemplos

    const orm = require('posting')

    let query = 'select campo1, campo2, campo3 from tabela'

    orm.getGeneric(query, null, (res, err) => {
        if(!err)
        {
            console.log(res)
        }
    }) // res será um array de objetos com os atributos campo1, campo2 e campo3

    // Query parametrizada
    query = 'select campo1, campo2, campo3 from tabela where campo1 = $1 and campo2 = $2'
    let values = ['value1', 'value2']

    orm.getGeneric(query, values, (res, err) => {
        if(!err)
        {
            console.log(res)
        }
    }) // Na query, '$1' será substituído pelo primeiro item do array e '$2' será substituído pelo segundo item do array

    // Create Table
    query = 'create table tabela(campo1 varchar(50), campo2 varchar(50), campo3 varchar(50))'

    orm.getGeneric(query, null, (res, err) => {
        if(!err)
        {
            console.log(res)
        }
    }) // Como a query executada não traz o resultado de uma consulta, res será um array vazio.
    // Porém, se a callback é invocada, significa que a execução foi bem sucedida, por tanto, teve efeito no banco de dados.


### genericAsync

#### Descrição
A função genericAsync realiza a chamada da função getGeneric no formato de Promise. O parâmetro text da função genericAsync será passado para o parâmetro text da função getGeneric, assim como o parâmetro values de genericAsync será passado para o parâmetro values de getGeneric e o parâmetro opcional onConfig da função genericAsync será passado para o parâmetro onConfig da função getGeneric. Para mais detalhes acerca dos parâmetros text, values e onConfig,consulte a documentação de getGeneric. Caso a função getGeneric consiga ser executada sem erros, a Promise de genericAsync será resolvida, recebendo a coleção encontrada na busca de getGeneric. Caso algum erro ocorra na execução de getGeneric, a Promise de genericAsync será rejeitada, recebendo o erro ocorrido.

#### Cuidados para o uso
O parâmetro text, o parâmetro values e o parâmetro onConfig de genericAsync são os mesmo de getGeneric. Consulte a documentação de getGeneric para mais detalhes acerca destes parâmetros.

#### Exemplos

    const orm = require('posting')

    // Query parametrizada
    let query = 'select campo1, campo2, campo3 from tabela where campo1 = $1 and campo2 = $2'
    let values = ['value1', 'value2']

    orm.genericAsync(query, values)
        .then(resp => console.log(resp))
        .catch(error => console.log(error)) // Na query, '$1' será substituído pelo primeiro item do array e '$2' será substituído pelo segundo item do array


### insertObject

#### Descrição
A função insertObject realiza a inserção dos dados de um objeto em uma tabela de um banco de dados Postgres. O parâmetro instance deve receber um objeto que contenha os dados que se deseja inserir. Caso a operação seja bem sucedida, a callback declarada no segundo parâmetro é invocada, recebendo o objeto inserido como parâmetro. Em caso de erro, a callback ainda é invocada, recebendo o erro ocorrido como segundo parâmetro. O parâmetro onConfig é opcional e, caso preenchido, deve conter o objeto com os dados necessários para estabelecimento da conexão. Caso onConfig seja omitido, serão utilizadas as informações contidas no arquivo postingConfig.js para estabelecimento da conexão (veja a documentação de getConnection).

#### Cuidados para o uso
O objeto passado no parâmetro instance deve ser instância de uma Classe cujo nome seja igual ao nome da tabela do banco de dados em que se deseje realizar a inserção. Da mesma forma, os atributos dessa Classe devem possuir os mesmos nomes dos campos dessa tabela, com exceção de '_Auto', que é um atributo reservado da Classe Posting destinado a identificar os atributos cujo preenchimento é realizado de forma automática pelo banco de dados postgres (como o campo destinado a uma chave primária sequencial, por exemplo). Assim, caso o objeto a ser inserido possua atributos cujo preenchimento é de responsabilidade do banco de dados, basta que a classe desse objeto herde a classe Posting, e esses atributos sejam informados ao método setAuto (veja a documentação de Posting).

#### Exemplos

    const orm = require('posting')

    class Teste
    {
        constructor(id = null, seq = null, campo = null)
        {
            this.id = id
            this.seq = seq
            this.campo = campo
        }
    }

    orm.insertObject(new Teste(1, 2, 'Mauro'), (res, err) => {
        if(!err)
        {
            console.log(res)
        }
    }) // Query gerada: insert into teste ("id", "seq", "campo") values (1, 2, 'Mauro')

    class Teste2 extends orm.Posting
    {
        constructor(id = null, seq = null, campo = null)
        {
            super()
            this.id = id
            this.seq = seq
            this.campo = campo
            this.setAuto('id', 'seq')
        }
    }

    orm.insertObject(new Teste2(null, null, 'Mauro'), (res, err) => {
        if(!err)
        {
            console.log(res)
        }
    }) // Query gerada: insert into teste2 (campo) values ('Mauro') returning id, seq
    // Os valores de retorno da query são usados para preencher o objeto antes de devolvê-lo à callback
    // Neste caso, mesmo que os valores de id e seq do objeto estivessem previamente preenchidos, seriam desonsiderados e substituídos pelo retorno da query


### insertAsync

#### Descrição
A função insertAsync realiza a chamada da função insertObject no formato de Promise. O parâmetro instance da função insertAsync será passado para o parâmetro instance da função insertObject, assim como o parâmetro opcional onConfig da função insertAsync será passado para o parâmetro onConfig da função insertObject. Para mais detalhes acerca dos parâmetros instance e onConfig, consulte a documentação de insertObject. Caso a função insertObject consiga ser executada sem erros, a Promise de insertAsync será resolvida, recebendo o objeto inserido na execução de insertObject. Caso algum erro ocorra na execução de insertObject, a Promise de insertAsync será rejeitada, recebendo o erro ocorrido.

#### Cuidados para o uso
O parâmetro instance e o parâmetro onConfig de insertAsync são os mesmo de insertObject. Consulte a documentação de insertObject para mais detalhes acerca destes parâmetros.

#### Exemplos

    const orm = require('posting')

    class Teste extends orm.Posting
    {
        constructor(id = null, seq = null, campo = null)
        {
            super()
            this.id = id
            this.seq = seq
            this.campo = campo
            this.setAuto('id', 'seq')
        }
    }

    orm.insertAsync(new Teste(null, null, 'Mauro'))
        .then(resp => console.log(resp))
        .catch(error => console.log(error)) // Query gerada: insert into teste ("campo") values ('Mauro') returning id, seq
    // Os valores de retorno da query são usados para preencher o objeto antes de devolvê-lo à callback de insertObject
    // Neste caso, mesmo que os valores de id e seq do objeto estivessem previamente preenchidos, seriam desonsiderados e substituídos pelo retorno da query


### updateObject

#### Descrição
A função updateObject realiza uma operação de atualização em um ou mais registros de um banco de dados Postgres. O parâmetro instance deve receber um objeto contendo os dados atualizados que devem ser salvos no banco de dados. Caso a operação seja bem sucedida, a callback declarada no segundo parâmetro é invocada, recebendo como parâmetro o mesmo objeto passado para a função updateObject. Em caso de erro, a callback ainda será invocada, recebendo como segundo parâmetro o erro ocorrido. O parâmetro onConfig é opcional e, caso preenchido, deve conter o objeto com os dados necessários para estabelecimento da conexão. Caso onConfig seja omitido, serão utilizadas as informações contidas no arquivo postingConfig.js para estabelecimento da conexão (veja a documentação de getConnection). 

#### Cuidados para o uso
O objeto passado no parâmetro instance deve ser uma instância de uma Classe cujo nome seja igual ao nome da tabela do banco de dados em que se deseja realizar a alteração. Da mesma forma, os atributos dessa Classe devem possuir os mesmos nomes dos campos dessa tabela, com exceção de '_Key', que destina-se a informar os atributos responsáveis por identificar o(s) registro(s) que será (serão) alterado(s). É importante ressaltar que o atributo _Key será utilizado pela função updateObject para montar a cláusula WHERE da query de alteração que será executada no banco de dados, ou seja, caso nenhum atributo seja declarado em _Key, a alteração será realizada em toda a tabela do banco de dados. Além disso, caso os atributos declarados em _Key não garantam a unicidade do registro, mais de um registro na tabela será alterado. Por fim, os atributos declarados em _Auto (veja a documentação de Posting) serão ignorados e seus valores não serão salvos na tabela. Para declarar atributos chaves (_Key) ou automáticos (_Auto) em uma Classe, basta que ela herde a Classe Posting.

#### Exemplos

    const orm = require('posting')

    class Aluno extends orm.Posting
    {
        constructor(id = null, auto = null, nome = null, curso = null)
        {
            super()
            this.id = id
            this.auto = 'auto'
            this.nome = nome
            this.curso = curso
            this.setAuto('auto')
            this.setKey('id')
        }
    }

    orm.updateObject(new Aluno(1, 'Outro auto', 'Mauro', 'ADS'), (res, err) => {
        if(!err)
        {
            console.log(res)
        }
    }) // Query gerada: update Aluno set nome = 'Mauro', curso = 'ADS' where id = 1


### updateAsync

#### Descrição
A função updateAsync realiza a chamada da função updateObject no formato de Promise. O parâmetro instance da função updateAsync será passado para o parâmetro instance da função updateObject, assim como o parâmetro opcional onConfig da função updateAsync será passado para o parâmetro onConfig da função updateObject. Para mais detalhes acerca dos parâmetros instance e onConfig, consulte a documentação de updateObject. Caso a função updateObject consiga ser executada sem erros, a Promise de updateAsync será resolvida, recebendo o mesmo objeto passado na execução de updateObject. Caso algum erro ocorra na execução de updateObject, a Promise de updateAsync será rejeitada, recebendo o erro ocorrido.

#### Cuidados para o uso
O parâmetro instance e o parâmetro onConfig de updateAsync são os mesmo de updateObject. Consulte a documentação de updateObject para mais detalhes acerca destes parâmetros.

#### Exemplos

    const orm = require('posting')

    class Aluno extends orm.Posting
    {
        constructor(id = null, auto = null, nome = null, curso = null)
        {
            super()
            this.id = id
            this.auto = 'auto'
            this.nome = nome
            this.curso = curso
            this.setAuto('auto')
            this.setKey('id')
        }
    }

    orm.updateAsync(new Aluno(1, 'Outro auto', 'Mauro', 'ADS'))
        .then(resp => console.log('update ok...'))
        .catch(error => console.log(error)) // // Query gerada: update Aluno set nome = 'Mauro', curso = 'ADS' where id = 1

### updateWithCustomQuery

#### Descrição
A função updateWithCustomQuery realiza uma operação de atualização em um ou mais registros de um banco de dados Postgres permitindo adicionar uma query customizável, de acordo com a necessidade. O parâmetro fields receberá essa query em forma de um objeto, em que cada chave do objeto é um campo da tabela e o valor da propriedade é o valor que será usado no teste lógico feito pelo banco de dados. O parâmetro instance deve receber um objeto contendo os dados atualizados que devem ser salvos no banco de dados. Caso a operação seja bem sucedida, a callback declarada no terceiro parâmetro é invocada, recebendo como parâmetro o mesmo objeto passado para a função updateWithCustomQuery. Em caso de erro, a callback ainda será invocada, recebendo como segundo parâmetro o erro ocorrido. O parâmetro onConfig é opcional e, caso preenchido, deve conter o objeto com os dados necessários para estabelecimento da conexão. Caso onConfig seja omitido, serão utilizadas as informações contidas no arquivo postingConfig.js para estabelecimento da conexão (veja a documentação de getConnection). 

#### Cuidados para o uso
As chaves do objeto que será o parâmetro fields devem ser iguais aos nomes de campos existentes na tabela a ser atualizada. As validações passadas no objeto fields são conectadas pelo operador lógico AND, ou seja, as condições determinadas nesse parâmetro serão somadas e seguirão a regra de validação lógica do operador AND. O objeto passado no parâmetro instance deve ser uma instância de uma Classe cujo nome seja igual ao nome da tabela do banco de dados em que se deseja realizar a alteração. Da mesma forma, os atributos dessa Classe devem possuir os mesmos nomes dos campos dessa tabela, com exceção de '_Key', que destina-se a informar os atributos responsáveis por identificar o(s) registro(s) que será (serão) alterado(s). Por fim, os atributos declarados em _Auto (veja a documentação de Posting) serão ignorados e seus valores não serão salvos na tabela. Para declarar atributos chaves (_Key) ou automáticos (_Auto) em uma Classe, basta que ela herde a Classe Posting.

#### Exemplos

    const orm = require('posting')

    class Pessoa extends orm.Posting {
        constructor(id = null, nome = null, idade = null, sexo = null) {
            super()
            this.id = id
            this.nome = nome
            this.idade = idade
            this.sexo = sexo
            this.setAuto('id')
        }
    }

    orm.updateWithCustomQuery({ idade: '23', sexo: 'M' }, new Pessoa(null, 'Victoria', 26, 'F'), 
        (res, err) => {
            if(!err) {
                console.log(res)
            }
    }) // Query gerada: update Pessoa set "nome" = 'Victoria', "Idade" = 26, "sexo" = 'F' where "idade" = 23 and "sexo" = 'M'

### updateWithCustomQueryAsync

#### Descrição
A função updateWithCustomQueryAsync realiza a chamada da função updateWithCustomQuery no formato de Promise. O parâmetro instance da função updateWithCustomQueryAsync será passado para o parâmetro instance da função updateWithCustomQuery, assim como o parâmetro opcional onConfig da função updateWithCustomQueryAsync será passado para o parâmetro onConfig da função updateWithCustomQuery. Para mais detalhes acerca dos parâmetros instance e onConfig, consulte a documentação de updateWithCustomQuery. Caso a função updateWithCustomQuery consiga ser executada sem erros, a Promise de updateWithCustomQueryAsync será resolvida, recebendo o mesmo objeto passado na execução de updateWithCustomQuery. Caso algum erro ocorra na execução de updateWithCustomQuery, a Promise de updateWithCustomQueryAsync será rejeitada, recebendo o erro ocorrido.

#### Cuidados para o uso
O parâmetro instance e o parâmetro onConfig de updateWithCustomQueryAsync são os mesmo de updateWithCustomQuery. Consulte a documentação de updateWithCustomQuery para mais detalhes acerca destes parâmetros.

#### Exemplos

    const orm = require('posting')

    class Pessoa extends orm.Posting {
        constructor(id = null, nome = null, idade = null, sexo = null) {
            super()
            this.id = id
            this.nome = nome
            this.idade = idade
            this.sexo = sexo
            this.setAuto('id')
        }
    }

    orm.updateWithCustomQueryAsync({ idade: '23', sexo: 'M' }, new Pessoa(null, 'Victoria', 26, 'F'))
        .then(resp => console.log('update ok...'))
        .catch(error => console.log(error)) // // update Pessoa set nome = 'Victoria', Idade = 26, sexo = 'F' where idade = 23 and sexo = 'M'

### deleteObject

#### Descrição
A função deleteObject realiza a deleção de um registro em uma tabela de um banco de dados Postgres. O parâmetro instance deve receber um objeto que contenha os dados do registro que se deseja deletar. Caso a operação seja bem sucedida, a callback declarada no segundo parâmetro é invocada, recebendo o mesmo objeto deletado como parâmetro. Em caso de erro, a callback ainda será invocada, recebendo como segundo parâmetro o erro ocorrido. O parâmetro onConfig é opcional e, caso preenchido, deve conter o objeto com os dados necessários para estabelecimento da conexão. Caso onConfig seja omitido, serão utilizadas as informações contidas no arquivo postingConfig.js para estabelecimento da conexão (veja a documentação de getConnection).

#### Cuidados para o uso
O objeto passado no parâmetro instance deve ser uma instância de uma Classe cujo nome seja igual ao nome da tabela do banco de dados em que se deseje realizar a deleção. Da mesma forma, os atributos dessa Classe devem possuir os mesmos nomes dos campos dessa tabela, com exceção de '_Auto' e '_Key', que são atributos reservados da Classe Posting. A função deleteObject utiliza os atributos declarados em '_Key' para a construção da cláusula WHERE da query de deleção que será executada e, por isso, o atributo '_Key' deve conter os atributos da classe que, juntos, formam o identificador único do registro a ser deletado. Caso os atributos declarados em '_Key' não garantam a unicidade do registro, mais de um registro poderá ser deletado do banco de dados. Caso nenhum atributo seja informado em '_Key', toda a tabela será deletada. Para declarar os atributos chaves (_Key) de uma Classe, baste que ela herde a Classe Posting (veja a documentação de Posting).

#### Exemplos

    const orm = require('posting')

    class Teste
    {
        constructor(id = null, seq = null, campo = null)
        {
            this.id = id
            this.seq = seq
            this.campo = campo
        }
    }

    orm.deleteObject(new Teste(1, 2, 'Mauro'), (res, err) => {
        if(!err)
        {
            console.log(res)
        }
    }) // Query gerada: delete from teste

    class Teste2 extends orm.Posting
    {
        constructor(id = null, seq = null, campo = null)
        {
            super()
            this.id = id
            this.seq = seq
            this.campo = campo
            this.setKey('id', 'seq')
        }
    }

    orm.deleteObject(new Teste2(1, 2, 'Mauro'), (res, err) => {
        if(!err)
        {
            console.log(res)
        }
    }) // Query gerada: delete from teste2 where id = 1 and seq = 2


### deleteAsync

#### Descrição
A função deleteAsync realiza a chamada da função deleteObject no formato de Promise. O parâmetro instance da função deleteAsync será passado para o parâmetro instance da função deleteObject, assim como o parâmetro opcional onConfig da função deleteAsync será passado para o parâmetro onConfig da função deleteObject. Para mais detalhes acerca dos parâmetros instance e onConfig, consulte a documentação de deleteObject. Caso a função deleteObject consiga ser executada sem erros, a Promise de deleteAsync será resolvida, recebendo o mesmo objeto passado na execução de deleteObject. Caso algum erro ocorra na execução de deleteObject, a Promise de deleteAsync será rejeitada, recebendo o erro ocorrido.

#### Cuidados para o uso
O parâmetro instance e o parâmetro onConfig de deleteAsync são os mesmo de deleteObject. Consulte a documentação de deleteObject para mais detalhes acerca destes parâmetros.

#### Exemplos

    const orm = require('posting')

    class Teste extends orm.Posting
    {
        constructor(id = null, seq = null, campo = null)
        {
            super()
            this.id = id
            this.seq = seq
            this.campo = campo
            this.setKey('id', 'seq')
        }
    }

    orm.deleteAsync(new Teste(1, 2, 'Mauro'))
        .then(resp => console.log('delete ok...'))
        .catch(error => console.log(error)) // Query gerada: delete from teste where id = 1 and seq = 2
