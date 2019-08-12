const getConnection = require('./getConnection')

const updateObject = (instance, callback, onConfig = null) => {
    
    let keys = []
    let autos = []
    let values = []
    let set = ""
    let where = ""
    let count = 1
    
    if (instance._Key != null && instance._Key != undefined)
    {
        keys = instance._Key
    }

    if (instance._Auto != null && instance._Auto != undefined)
    {
        autos = instance._Auto
    }

    Object.getOwnPropertyNames(instance).forEach(element => {
        if (keys.indexOf(element) == -1 && autos.indexOf(element) == -1
            && Object.getOwnPropertyDescriptor(instance, element).enumerable)
        {
            if (set == "")
            {
                set += `${element} = $${count++}`
            }
            else 
            {
                set += `, ${element} = $${count++}`
            }

            values.push(instance[element])
        }
    })

    if (count > 1) 
    {
        keys.forEach(k => {
            if (where == "")
            {
                where += `where ${k} = $${count++}`
            }
            else 
            {
                where += ` and ${k} = $${count++}`
            }

            values.push(instance[k])
        })

        let query = {
            text: `update ${instance.constructor.name} set ${set} ${where}`,
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
    else 
    {
        callback(instance, false)
    }
}

module.exports = updateObject
