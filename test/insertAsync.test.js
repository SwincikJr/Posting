const orm = require('../index')

test('Inserir dado em tabela existente.', async () => {

    class Aluno extends orm.Posting
    {
        constructor(id = null, nome = null, curso = null)
        {
            super()
            this.id = id
            this.nome = nome
            this.curso = curso
            this.setAuto('id')
        }
    }

    let error = false
    let response = {}
    let id_response = false

    try
    {

        response = await orm.insertAsync(new Aluno(null, 'Mauro', 'ADS'))

        id_response = response.id != null && response.id != undefined && typeof response.id == 'number'

    }
    catch(e)
    {

        error = true

    }

    expect([
        id_response, 
        response.nome, 
        response.curso, 
        error
    ]).toEqual([
        true,
        'Mauro',
        'ADS',
        false
    ])

})

test('Inserir dado em tabela existente somente com atributos auto.', async () => {

    class Aluno extends orm.Posting
    {
        constructor(id = null, nome = null, curso = null)
        {
            super()
            this.id = id
            this.nome = nome
            this.curso = curso
            this.setAuto('id', 'nome', 'curso')
        }
    }

    let error = false
    let response = {}
    let id_response = false

    try
    {

        response = await orm.insertAsync(new Aluno())

        id_response = response.id != null && response.id != undefined && typeof response.id == 'number'

    }
    catch(e)
    {

        error = true

    }

    expect([
        id_response, 
        response.nome, 
        response.curso, 
        error
    ]).toEqual([
        true,
        null,
        null,
        false
    ])

})

test('Inserir dado em tabela inexistente.', async () => {

    class Inexistente
    {
        constructor()
        {
            this.atributo = null
        }
    }

    let error = false
    let response = {}

    try
    {

        response = await orm.insertAsync(new Inexistente())

    }
    catch(e)
    {

        error = true

    }

    expect([response, error]).toEqual([ {}, true ])

})

test('Inserir dado em tabela existente e campo inexistente.', async () => {

    class Aluno
    {
        constructor()
        {
            this.inexistente = 'inexistente'
        }
    }

    let error = false
    let response = {}

    try
    {

        response = await orm.insertAsync(new Aluno())

    }
    catch(e)
    {

        error = true

    }

    expect([response, error]).toEqual([ {}, true ])

})

test('Tentativa de inserção com dados de conexão incorretos.', async () => {

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

        response = await orm.insertAsync({}, conn)
    
    }
    catch(e)
    {
    
        error = true
    
    }

    expect([response, error]).toEqual([ {}, true ])

})
