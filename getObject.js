const getConnection = require('./getConnection')

const getObject = (instance, callback, onConfig = null) => {

    let filter = `select * from ${instance.constructor.name} where 1 = 1`;
    let values = []
    let count = 1

    Object.getOwnPropertyNames(instance).forEach(element => {
        if (instance[element] != null && instance[element] != undefined && Object.getOwnPropertyDescriptor(instance, element).enumerable) 
        {
            filter += ` and ${element} = $${count++}`
            values.push(instance[element])
        }
    });

    const query = {
        text: filter,
        values: values
    }

    getConnection(client => {
        client.query(query, (err, res) => {
            if (err)
            {
                throw err
            }
            else if (res.rows.length == 0)
            {
                callback(null)
            }
            else
            {
                Object.getOwnPropertyNames(instance).forEach(element => {
                    instance[element] = res.rows[0][element]
                })
                callback(instance)
            }
            client.end()
        })   
    }, onConfig)
}

module.exports = getObject
