const updateWithCustomQuery = require('./updateWithCustomQuery')

const updateWithCustomQueryAsync = (fields, instance, onConfig = null) => {

    return new Promise((resolve, reject) => {

        updateWithCustomQuery(fields, instance, (resp, error) => {

            if(error)
            {
                reject(error)
            }
            else
            {
                resolve(resp)
            }

        }, onConfig)

    })

}

module.exports = updateWithCustomQueryAsync
