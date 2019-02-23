const getConnection = require('./getConnection')

test('Teste de conexão com configurações corretas (vindas dos arquivo postingConfig.js)', () => {

    const callback = data => {
        data.end()
        expect(data.constructor.name).toEqual('Client')
    }
    
    getConnection(callback)
})

test('Teste de conexão com configuraçoes incorretas (passadas como segundo parâmetro)', () => {
    
    const config = {
        user: 'inexistente',
        host: 'inexistente',
        database: 'inexistente',
        password: 'inexistente',
        port: 0
    }

    const cb = client => { client.end() }
    
    const testingGetConnection = () => {
        getConnection(cb, config)
        done()
    }

    expect(testingGetConnection).toThrow()
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

    getConnection(callback)
})
