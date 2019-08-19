const orm = require('./index')

let conn = {
    user: 'inexistente',
    host: 'inexistente',
    database: 'inexistente',
    password: 'inexistente',
    port: 0
}

orm.getAsync({}, conn).then(resp => console.log(resp)).catch(error => console.log(error))
