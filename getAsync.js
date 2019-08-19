const getObject = require('./getObject')

const getAsync = (instance, onConfig = null) => {

    return new Promise((resolve, reject) => {
        
        getObject(instance, (resp, error) => {

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

module.exports = getAsync
