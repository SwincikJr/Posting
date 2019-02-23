const getConnection = require('./getConnection')
const getObject = require('./getObject')

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
