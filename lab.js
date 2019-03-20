const getConnection = require('./getConnection')
const getObject = require('./getObject')
const insertObject = require('./insertObject')
const Posting = require('./Posting')

getConnection(client => {
    console.log('Doing something...')
    client.end()
})

class Pessoa
{
    constructor(id = null, nome = null)
    {
        this.id = id
        this.nome = nome
    }
}

getObject(new Pessoa(1, null), res => {
    console.log(res)
})

getObject(new Pessoa(null, 'Inexistente'), res => {
    console.log(res)
})

getObject(new Pessoa(), res => {
    console.log(res)
})

class Aluno extends Posting
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

insertObject(new Aluno(null, 'Mauro', 'ADS'), resp => console.log(resp))
