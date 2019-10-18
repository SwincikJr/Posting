const orm = require('./index')

test('Alterar dado de classe sem _Key', () => {

    class Tarefa extends orm.Posting
    {
        constructor(id = null, descricao = null)
        {
            super()
            this.id = id
            this.descricao = descricao
            this.setAuto('id')
        }
    }

    let tarefaParaAlterar = {}
    let idTarefaAfetada = 0

    const insertOne = () => {
        orm.insertAsync(new Tarefa(null, 'Tarefa 1')).then(resp => {
            tarefaParaAlterar = resp
            insertTwo()	
        })
    }

    const insertTwo = () => {
        orm.insertAsync(new Tarefa(null, 'Tarefa 2')).then(resp => {
            idTarefaAfetada = resp.id
            atualizaTarefa()
        })
    }

    const atualizaTarefa = () => {
        tarefaParaAlterar.descricao = 'Tarefa 3'
        orm.updateAsync(tarefaParaAlterar).then(resp => {
            tarefaParaAlterar = resp
            verificaAfetada()
        })
    }

    const verificaAfetada = () => {
        orm.getAsync(new Tarefa(idTarefaAfetada)).then(resp => {
            expect(resp.descricao).toEqual(tarefaParaAlterar.descricao)
        })
    }

    insertOne()

})

test('Alterar dado de classe somente _Key', () => {

    class Etapa extends orm.Posting
    {
        constructor(id = null, descricao = null)
        {
            super()
            this.id = id
            this.descricao = descricao
            this.setAuto('id')
            this.setKey('id', 'descricao')
        }
    }

    let etapa = new Etapa(null, 'Etapa 1')

    updateRecord = () => {
        orm.updateAsync(etapa).then(resp => {
            checkRecord()
        })
    }

    checkRecord = () => {
        orm.getAsync(etapa).then(resp => {
            expect(resp).toEqual(null)
        })
    }

    orm.getAsync(etapa).then(resp => {
        etapa = resp
        etapa.descricao = 'Etapa 2'
        updateRecord()
    })

})

test('Alterar dado de classe com atributos _Key e não _Key', () => {

    class Item extends orm.Posting
    {
        constructor(id = null, descricao = null)
        {
            super()
            this.id = id
            this.descricao = descricao
            this.setAuto('id')
            this.setKey('id')
        }
    }
    
    orm.insertAsync(new Item(null, 'Item 1')).then(resp => {
        resp.descricao = 'Item 2'
        orm.updateAsync(resp).then(resp => {
            orm.getAsync(new Item(resp.id)).then(resp => {
                expect(resp.descricao).toEqual('Item 2')
            })
        })
    })

})

test('Tentativa de alteração em tabela não existente', async () => {

    class Inexistente
    {
        constructor()
        {
            this.atr = ''
        }

    }

    let error = false
    let response = {}

    try
    {
        response = await orm.updateAsync(new Inexistente())
    }
    catch(e)
    {
        error = true
    }

    expect(error).toEqual(true)

})

test('Tentativa de alteração em coluna não existente', async () => {

    class Tarefa extends orm.Posting
    {
        constructor(id = null, descricao = null)
        {
            super()
            this.id = id
            this.descricao = descricao
            this.setAuto('id')
        }
    }

    let tarefa = new Tarefa()
    tarefa.inexistente = 'inexistente'

    let error = false
    let response = {}

    try
    {
        response = await orm.updateAsync(tarefa)
    }
    catch(e)
    {
        error = true
    }

    expect(error).toEqual(true)

})

test('Tentativa de alteração com dados de conexão incorretos', async () => {

    class Teste
    {
        constructor(atr = null)
        {
            this.atr = atr
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
    let response = {}

    try
    {
        response = await orm.updateAsync(new Teste(), conn)
    }
    catch(e)
    {
        error = true
    }

    expect(error).toEqual(true)

})
