const getConnection = require('./getConnection')

const deleteObject = (instance, callback, onConfig = null) => {

    let keys = []
    let values = []
    let where = ''
    let count = 1

    if (instance._Key != null && instance._Key != undefined)
    {
        keys = instance._Key
    }

    keys.forEach(element => {

        if(where == '') 
        {
            where = `where ${element} = $${count++}`
        }
        else 
        {
            where += ` and ${element} = $${count++}`
        }

        values.push(instance[element])

    });

    let query = {
        text: `delete from ${instance.constructor.name} ${where}`,
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
                callback(instance)
            }

            client.end()
        })

    }, onConfig)
}

module.exports = deleteObject
