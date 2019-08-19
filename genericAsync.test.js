const orm = require('./index')

test('Execução de query não parametrizada com retorno.', async () => {

    let error = false
    let response = []
    let query = 'select * from atleta'

    try
    {

        response = await orm.genericAsync(query, null)

    }
    catch(e)
    {

        error = true

    }

    expect([response, error])
        .toEqual([
            [ { id: 1, nome: 'Marta', modalidade: 'Futebol' },
              { id: 2, nome: 'Michael Jordan', modalidade: 'Basquete' },
              { id: 3, nome: 'Daniel Negreanu', modalidade: 'Poker' } ],
            false
        ])

})

test('Execução de query parametrizada com 1 valor e com retorno', async () => {

    let error = false
    let response = []
    let query = 'select * from atleta where modalidade = $1'
    let values = ['Futebol']

    try
    {

        response = await orm.genericAsync(query, values)

    }
    catch(e)
    {

        error = true

    }

    expect([response, error])
        .toEqual([
            [ { id: 1, nome: 'Marta', modalidade: 'Futebol' } ],
            false
        ])

})

test('Execução de query parametrizada com 2 valores e com retorno.', async () => {

    let error = false
    let response = []
    let query = 'select * from atleta where modalidade in ($1, $2)'
    let values = ['Basquete', 'Poker']

    try
    {

        response = await orm.genericAsync(query, values)

    }
    catch(e)
    {

        error = true

    }

    expect([response, error])
        .toEqual([
            [ { id: 2, nome: 'Michael Jordan', modalidade: 'Basquete' },
              { id: 3, nome: 'Daniel Negreanu', modalidade: 'Poker' } ],
            false
        ])

})

test('Execução de query sem retorno.', async () => {

    let error = false
    let inserted = false
    let response = []
    let beforeInsert = 0
    let afterInsert = 0
    let insert = "insert into musica(autor, nome, ano) values ('John Lennon', 'Imagine', 1980)"
    let query = "select * from musica where autor = 'John Lennon' and nome = 'Imagine' and ano = 1980;"

    try
    {

        beforeInsert = await orm.genericAsync(query, null)
        beforeInsert = beforeInsert.length

        response = await orm.genericAsync(insert, null)

        afterInsert = await orm.genericAsync(query, null)
        afterInsert = afterInsert.length

        inserted = afterInsert > beforeInsert

    }
    catch(e)
    {
        error = true
    }

    expect([
        response, 
        error, 
        inserted
    ]).toEqual([
        [],
        false,
        true
    ])

})

test('Execução de query parametrizada com número de parâmetros diferente dos valores informados.', async () => {

    let error = false
    let response = []
    let query = 'select * from atleta where modalidade = $1'
    let values = ['Poker', 'Daniel Negreanu']

    try
    {

        response = await orm.genericAsync(query, values)

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
    let query = 'select * from atleta'

    let conn = {
        user: 'inexistente',
        host: 'inexistente',
        database: 'inexistente',
        password: 'inexistente',
        port: 0
    }

    try
    {

        response = await orm.genericAsync(query, null, conn)

    }
    catch(e)
    {

        error = true

    }

    expect([response, error]).toEqual([ [], true ])

})
