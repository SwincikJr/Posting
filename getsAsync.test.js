const orm = require('./index')

class Jogo
{
    constructor(id = null, nome = null)
    {
        this.id = id
        this.nome = nome
    }
}

class Pessoa
{
    constructor(id = null, nome = null)
    {
        this.id = id
        this.nome = nome
    }
}

class Inexistente
{

}

test('Consulta em uma tabela com dois registros, mas retornando apenas um.', async () => {
   
    let error = false
    let response = []

    try
    {

        response = await orm.getsAsync(new Jogo(1))

    }
    catch(e)
    {

        error = true

    }

    expect([response, error])
        .toEqual([
            [ { id: 1, nome: 'Uncharted' } ], 
            false
        ])

})

test('Consulta em uma tabela com dois registros e retornando os dois.', async () => {

    let error = false
    let response = []

    try
    {

        response = await orm.getsAsync(new Jogo())

    }
    catch(e)
    {

        error = true

    }

    expect([response, error])
        .toEqual([
            [ { id: 1, nome: 'Uncharted' },
              { id: 2, nome: 'Resident Evil 4' } ],
            false
        ])

})

test('Consulta em uma tabela existente e nenhum registro existente.', async () => {

    let error = false
    let response = []

    try
    {

        response = await orm.getsAsync(new Pessoa(null, 'Inexistente'))

    }
    catch(e)
    {

        error = true

    }

    expect([response, error]).toEqual([ [], false ])

})

test('Consulta em uma tabela inexistente.', async () => {

    let error = false
    let response = []

    try
    {

        response = await orm.getsAsync(new Inexistente())

    }
    catch(e)
    {

        error = true

    }

    expect([response, error]).toEqual([ [], true ])

})

test('Consulta em uma tabela existente buscando por campo inexistente.', async () => {

    let error = false
    let response = []

    let pessoa = new Pessoa()
    pessoa.inexistente = 'inexistente'

    try
    {

        response = await orm.getsAsync(pessoa)

    }
    catch(e)
    {

        error = true

    }

    expect([response, error]).toEqual([ [], true ])

})

test('Tentativa de consulta com parâmetros de conexão inválidos.', async () => {

    let error = false
    let response = []

    let conn = {
        user: 'inexistente',
        host: 'inexistente',
        database: 'inexistente',
        password: 'inexistente',
        port: 0
    }

    try
    {

        response = await orm.getsAsync(new Pessoa(), conn)

    }
    catch(e)
    {

        error = true

    }

    expect([response, error]).toEqual([ [], true ])

})
