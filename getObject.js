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

    getConnection((client, error) => {

        if(!error)
        {
            client.query(query, (err, res) => {
                if (err)
                {
                    callback(null, err)
                }
                else if (res.rows.length == 0)
                {
                    callback(null, false)
                }
                else
                {
                    Object.getOwnPropertyNames(instance).forEach(element => {
                        instance[element] = res.rows[0][element]
                    })
                    callback(instance, false)
                }
                client.end()
            }) 
        } 
        else 
        {
            callback(null, error)
        } 
        
    }, onConfig)
}

module.exports = getObject
