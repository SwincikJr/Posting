const orm = require('./index')

let conn = {
    user: 'inexistente',
    host: 'inexistente',
    database: 'inexistente',
    password: 'inexistente',
    port: 0
}

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

//orm.getAsync({}, conn).then(resp => console.log(resp)).catch(error => console.log(error))

//orm.getsAsync(new Jogo(1, 'Uncharted')).then(resp => console.log(resp))

//orm.getsAsync(new Jogo()).then(resp => console.log(resp))

//orm.getsAsync(new Pessoa(null, 'Inexistente')).then(resp => console.log(resp))

//orm.getsAsync(new Inexistente()).then(resp => console.log(resp)).catch(error => console.log(error))

//let pessoa = new Pessoa()
//pessoa.inexistente = 'inexistente'

//orm.getsAsync(pessoa).then(resp => console.log(resp)).catch(error => console.log(error))

orm.getsAsync({}, conn).then(resp => console.log(resp)).catch(error => console.log(error))
