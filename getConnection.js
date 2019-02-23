const getConnection = (callback, config = null) => {
    
    const { Client } = require('pg')
    const conf = config ? config : require('./postingConfig') 
    const client = new Client(conf)

    client.connect(error => {
        if (!error)
        {
            callback(client)
        }
        else
        {
            throw error
        }
    })
}

module.exports = getConnection
