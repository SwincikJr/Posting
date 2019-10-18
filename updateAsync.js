const updateObject = require('./updateObject')

const updateAsync = (instance, onConfig = null) => {

    return new Promise((resolve, reject) => {

        updateObject(instance, (resp, error) => {

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

module.exports = updateAsync
