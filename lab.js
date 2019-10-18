const orm = require('./index')

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

orm.deleteAsync(new Inexistente(), conn).then(resp => console.log(resp)).catch(error => console.log(error))
