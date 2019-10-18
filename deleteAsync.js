const deleteObject = require('./deleteObject')

const deleteAsync = (instance, onConfig = null) => {

    return new Promise((resolve, reject) => {

        deleteObject(instance, (resp, error) => {

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

module.exports = deleteAsync
