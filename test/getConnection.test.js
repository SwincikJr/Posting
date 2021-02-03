const orm = require('../index')

// Consulte os Casos de Usos automatizados de getConnection para pré-condições
// Documentação/getConnection/Casos de Uso.txt 

test('Teste de conexão com configurações corretas (vindas dos arquivo postingConfig.js)', () => {

    const callback = data => {
        data.end()
        expect(data.constructor.name).toEqual('Client')
    }
    
    orm.getConnection(callback)
})

test('Teste de conexão com configuraçoes incorretas (passadas como segundo parâmetro)', () => {
    
    const config = {
        user: 'inexistente',
        host: 'inexistente',
        database: 'inexistente',
        password: 'inexistente',
        port: 0
    }

    let erro = false

    const tryConnection = () => {
        return new Promise((resolve, reject) => {
            orm.getConnection((client, error) => {
                if(error)
                {
                    reject()
                }
                else
                {
                    client.end()
                    resolve()
                }
            }, config)
        })
    }

    return tryConnection().catch(() => { erro = true }).finally(() => {
        expect(erro).toEqual(true)
    })
})

test('Teste de conexão com configurações corretas (passadas como segundo parâmetro)', () => {
    
    const config = {
        user: 'postgres',
        host: 'localhost',
        database: 'testes',
        password: '',
        port: 5432
    }
    
    const callback = data => {
        data.end()
        expect(data.constructor.name).toEqual('Client')
    }

    orm.getConnection(callback)
})
