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

    getConnection((client, error) => {

        if(!error)
        {
            client.query(query, (err, res) => {
            
                if (err)
                {
                    callback(null, err)
                }
                else 
                {
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

module.exports = deleteObject
