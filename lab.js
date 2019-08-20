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

/*
class Inexistente
{

}
*/

/*
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
*/

class Inexistente
{
    constructor()
    {
        this.atributo = null
    }
}

//orm.getAsync({}, conn).then(resp => console.log(resp)).catch(error => console.log(error))

//orm.getsAsync(new Jogo(1, 'Uncharted')).then(resp => console.log(resp))

//orm.getsAsync(new Jogo()).then(resp => console.log(resp))

//orm.getsAsync(new Pessoa(null, 'Inexistente')).then(resp => console.log(resp))

//orm.getsAsync(new Inexistente()).then(resp => console.log(resp)).catch(error => console.log(error))

//let pessoa = new Pessoa()
//pessoa.inexistente = 'inexistente'

//orm.getsAsync(pessoa).then(resp => console.log(resp)).catch(error => console.log(error))

//orm.getsAsync({}, conn).then(resp => console.log(resp)).catch(error => console.log(error))

//let query = 'select * from atleta'

//orm.genericAsync(query, null).then(resp => console.log(resp))

//let query = 'select * from atleta where modalidade = $1'
//let values = ['Futebol']

//orm.genericAsync(query, values).then(resp => console.log(resp))

//let query = 'select * from atleta where modalidade in ($1, $2)'
//let values = ['Basquete', 'Poker']

//orm.genericAsync(query, values).then(resp => console.log(resp))

//let query = 'select * from atleta where modalidade = $1'
//let values = ['Poker', 'Daniel Negreanu']

//orm.genericAsync(query, values).then(resp => console.log(resp)).catch(error => console.log(error))

//orm.genericAsync("", null, conn).then(resp => console.log(resp)).catch(error => console.log(error))

//orm.insertAsync(new Aluno(null, 'Mauro', 'ADS')).then(resp => console.log(resp))

/*
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

orm.insertAsync(new Aluno()).then(resp => console.log(resp))
*/

//orm.insertAsync(new Inexistente()).then(resp => console.log(resp)).catch(error => console.log(error))

class Aluno
{
    constructor()
    {
        this.inexistente = 'inexistente'
    }
}

//orm.insertAsync(new Aluno()).then(resp => console.log(resp)).catch(error => console.log(error))

//orm.insertAsync({}, conn).then(resp => console.log(resp)).catch(error => console.log(error))
