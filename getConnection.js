const { Client } = require('pg')
const path = require('path')
const fs = require('fs')

const getConnection = (callback, config = null) => {

    let postingConfigPath
    let existsFile
    let postingConfig

    if(!config)
    {
        postingConfigPath = path.format({
            dir: path.dirname(require.main.filename),
            base: 'postingConfig.js'
        })
    
        existsFile = fs.existsSync(postingConfigPath)
        
        postingConfig = require(existsFile ? postingConfigPath : './postingConfig')
    }

    const conf = config ? config : postingConfig
    
    const client = new Client(conf)

    client.connect(error => {
        if (!error)
        {
            callback(client, false)
        }
        else
        {
            callback(null, error)
        }
    })
}

module.exports = getConnection
