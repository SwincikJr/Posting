const orm = require('../index')

test('Dele��o de objeto sem chave declarada', async () => {

    class Leitor extends orm.Posting
    {
        constructor(id = null, nome = null)
        {
            super()
            this.id = id
            this.nome = nome
            this.setAuto('id')
        }
    }
    
    let firstRecord = {}
    let secondRecord = {}
    let thirdRecord = {}
    let error = false

    try
    {
        firstRecord = await orm.insertAsync(new Leitor(null, 'Pedro'))

        secondRecord = await orm.insertAsync(new Leitor(null, 'Hebert'))

        thirdRecord = await orm.insertAsync(new Leitor(null, 'Guilherme'))

        await orm.deleteAsync(firstRecord)

        firstRecord = await orm.getAsync(firstRecord)

        secondRecord = await orm.getAsync(secondRecord)

        thirdRecord = await orm.getAsync(thirdRecord)
    }
    catch(e)
    {
        error = true
    }

    expect([
        firstRecord,
        secondRecord,
        thirdRecord,
        error
    ]).toEqual([
        null,
        null,
        null,
        false
    ])
})

test('Dele��o de objeto com chave declarada e sem garantia de unicidade', async () => {

    class Livro extends orm.Posting
    {
        constructor(id = null, seq = null, titulo = null)
        {
            super()
            this.id = id
            this.seq = seq
            this.titulo = titulo
            this.setAuto('id')
            this.setKey('seq')
        }
    }

    let firstRecord = {}
    let secondRecord = {}
    let thirdRecord = {}
    let error = false

    try
    {
        firstRecord = await orm.insertAsync(new Livro(null, '001', 'T�tulo A'))

        secondRecord = await orm.insertAsync(new Livro(null, '001', 'T�tulo B'))

        thirdRecord = await orm.insertAsync(new Livro(null, '002', 'T�tulo C'))

        await orm.deleteAsync(firstRecord)

        firstRecord = await orm.getAsync(firstRecord)

        secondRecord = await orm.getAsync(secondRecord)

        thirdRecord = await orm.getAsync(thirdRecord)
    }
    catch(e)
    {
        error = true
    }

    expect([
        firstRecord,
        secondRecord,
        thirdRecord,
        error
    ]).toEqual([
        null,
        null,
        { id: thirdRecord.id, seq: '002', titulo: 'T�tulo C' },
        false
    ])
})

test('Dele��o de objeto com chave declarada e com garantia de unicidade', async () => {

    class Roteiro extends orm.Posting
    {
        constructor(id = null, seq = null, titulo = null)
        {
            super()
            this.id = id
            this.seq = seq
            this.titulo = titulo
            this.setAuto('id')
            this.setKey('id', 'seq') // Ajuste realizado para fins de cobertura de c�digo
        }
    }

    let firstRecord = {}
    let secondRecord = {}
    let thirdRecord = {}
    let error = false

    try
    {
        firstRecord = await orm.insertAsync(new Roteiro(null, '001', 'T�tulo A'))

        secondRecord = await orm.insertAsync(new Roteiro(null, '001', 'T�tulo B'))

        thirdRecord = await orm.insertAsync(new Roteiro(null, '002', 'T�tulo C'))

        await orm.deleteAsync(firstRecord)

        firstRecord = await orm.getAsync(firstRecord)

        secondRecord = await orm.getAsync(secondRecord)

        thirdRecord = await orm.getAsync(thirdRecord)
    }
    catch(e)
    {
        error = true
    }

    expect([
        firstRecord,
        secondRecord,
        thirdRecord,
        error
    ]).toEqual([
        null,
        { id: secondRecord.id, seq: '001', titulo: 'T�tulo B' },
        { id: thirdRecord.id, seq: '002', titulo: 'T�tulo C' },
        false
    ])
})

test('Dele��o de objeto inexistente', async () => {

    class Inexistente
    {
        constructor()
        {
            this.inexistente = 'inexistente'
        }
    }

    let error = false

    try
    {
        await orm.deleteAsync(new Inexistente())
    }
    catch(e)
    {
        error = true
    }

    expect(error).toEqual(true)
})

test('Tentativa de dele��o com dados de conex�o incorretos', async () => {

    class Inexistente
    {
        constructor()
        {
            this.inexistente = 'inexistente'
        }
    }
    
    let conn = {
        user: '',
        host: '',
        database: '',
        password: '',
        port: 0
    }

    let error = false

    try
    {
        await orm.deleteAsync(new Inexistente(), conn)
    }
    catch(e)
    {
        error = true
    }

    expect(error).toEqual(true)
})
