const insertObject = require('./insertObject')

const insertAsync = (instance, onConfig = null) => {

    return new Promise((resolve, reject) => {

        insertObject(instance, (resp, error) => {

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

module.exports = insertAsync
