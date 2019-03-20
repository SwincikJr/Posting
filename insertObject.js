const getConnection = require('./getConnection')

const insertObject = (instance, callback, onConfig = null) => {

    let campos = ''
    let valores = ''
    let returning = ''
    let autos = []
    let values = []
    let count = 1
    let text

    if (instance._Auto != null && instance._Auto != undefined)
    {
        autos = instance._Auto
    }

    if (autos.length > 0)
    {
        returning = 'returning '
        autos.forEach(a => {
            returning += autos.indexOf(a) == 0 ? `${a}` : `, ${a}`
        })
    }

    Object.getOwnPropertyNames(instance).forEach(element => {
        if(autos.indexOf(element) == -1 && Object.getOwnPropertyDescriptor(instance, element).enumerable)
        {   
            if (count == 1)
            {
                campos += `${element}`
                valores += `$${count++}`     
            }
            else 
            {
                campos += `, ${element}`
                valores += `, $${count++}`
            }

            values.push(instance[element])
        }
    })

    if (count > 1)
    {
        text = `insert into ${instance.constructor.name} (${campos}) values (${valores}) ${returning}`
    }
    else
    {
        text = `insert into ${instance.constructor.name} default values ${returning}`
    }

    let query = {
        text: text,
        values: values
    }

    getConnection(client => {
        client.query(query, (err, res) => {
            if (err)
            {
                throw err
            }
            else
            {
                if(autos.length > 0)
                {
                    autos.forEach(a => {
                        instance[a] = res.rows[0][a]
                    })
                }

                callback(instance)
            }

            client.end()
        })
        
    }, onConfig)
}

module.exports = insertObject
