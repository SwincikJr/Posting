const getConnection = require('./getConnection')

const getGeneric = (text, values, callback, onConfig = null) => {

    let rowObject
    let response = []

    const query = {
        text: text,
        values: values == null ? [] : values
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
                    res.rows.forEach(row => {
    
                        rowObject = {}
                        
                        Object.getOwnPropertyNames(row).forEach(property => {
                            rowObject[property] = row[property]
                        })
                        
                        response.push(rowObject)
                    })
                    
                    callback(response, false)
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

module.exports = getGeneric
