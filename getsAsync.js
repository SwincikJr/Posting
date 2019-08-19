const getObjects = require('./getObjects')

const getsAsync = (instance, onConfig = null) => {

    return new Promise((resolve, reject) => {

        getObjects(instance, (resp, error) => {

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

module.exports = getsAsync
