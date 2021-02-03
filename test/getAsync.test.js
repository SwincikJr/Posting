const orm = require('../index')

class Pessoa
{
    constructor(id = null, nome = null)
    {
        this.id = id
        this.nome = nome
    }
}

test('Consulta em uma tabela existente e um registro existente.', async () => {

    let response = {}
    let error = false

    try
    {

        response = await orm.getAsync(new Pessoa(1))

    }
    catch(e)
    {

        error = e

    }

    expect([response.nome, error]).toEqual(['Mauro', false])

})

test('Consulta em uma tabela existente e nenhum registro existente.', async () => {

    let response = {}
    let error = false

    try
    {

        response = await orm.getAsync(new Pessoa(null, 'Inexistente'))

    }
    catch(e)
    {

        error = e

    }

    expect([response, error]).toEqual([null, false])

})

test('Consulta em uma tabela existente e muitos registros existentes.', async () => {

    let response = {}
    let error = false

    try
    {

        response = await orm.getAsync(new Pessoa())

    }
    catch(e)
    {

        error = e

    }

    expect([response, error]).toEqual([{ id: 1, nome: 'Mauro' }, false])

})

test('Consulta em uma tabela inexistente.', async () => {

    class Inexistente {}

    let response = {}
    let error = false

    try
    {

        response = await orm.getAsync(new Inexistente())

    }
    catch(e)
    {

       error = true
        
    }

    expect([response, error]).toEqual([{}, true])

})

test('Consulta em uma tabela existente buscando por campo inexistente.', async () => {

    let error = false

    let pessoa = new Pessoa()

    pessoa.inexistente = 'inexistente'

    try
    {

        pessoa = await orm.getAsync(pessoa)

    }
    catch(e)
    {

        error = true

    }
    
    expect([pessoa, error])
        .toEqual([{ id: null, nome: null, inexistente: 'inexistente' }, true])

})

test('Tentativa de consulta com parâmetros de conexão inválidos.', async () => {

    let error = false

    let response = {}
    
    let conn = {
        user: 'inexistente',
        host: 'inexistente',
        database: 'inexistente',
        password: 'inexistente',
        port: 0
    }

    try
    {

        response = await orm.getAsync(new Pessoa(), conn)

    }
    catch(e)
    {

        error = true

    }

    expect([response, error]).toEqual([{}, true])

})
