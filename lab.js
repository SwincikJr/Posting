const orm = require('./index')

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

orm.updateAsync(new Teste(), conn).then(resp => console.log(resp)).catch(error => console.log(error))
