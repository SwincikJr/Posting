# Posting

## O que é o Posting?

Posting é uma ORM simples, baseada no módulo [pg](https://www.npmjs.com/package/pg) para conexão com Bancos de Dados PostgreSQL.

O Posting é indicado para projetos com modelos de dados simples, pois não realiza validações prévias de dados, deixando essa implementação por parte do desenvolvedor que opte pelo seu uso.

## Instalação

    $ npm install posting

## Documentação

### getConnection

#### Descrição
A função getConnection estabelece uma conexão com um banco de dados Postgres à partir das informações de conexão disponiblizadas no arquivo postingConfig.js no mesmo diretório do arquivo fonte getConnection.js ou no objeto de configuração passado como segundo parâmetro da função. Caso a conexão consiga ser estabelecida sem erros, a função invoca uma callback, passando-lhe como primeiro argumento o objeto client instanciado para a conexão. Caso haja falha no momento da conexão, a callback será invocada recebedo o erro ocorrido como segundo parâmetro.

#### Cuidados para o uso
É importante ressaltar a necessidade do arquivo postingConfig.js no mesmo diretório do arquivo getConnection.js caso não seja passado nenhum objeto de configuração como segundo parâmetro da função. O arquivo postingConfig.js deve exportar de seu módulo um objeto contendo os atributos necessários para estabelecimento da conexão, conforme exemplo abaixo:

    module.exports = {
        user: 'user',
        host: 'host',
        database: 'database',
        password: 'password',
        port: 5432 //your port
    }

Além disso, a função getConnection estabelece uma conexão mas não a encerra, ficando de responsabilidade do usuário a liberação do recurso com o método end() da classe Client.

#### Exemplos:

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