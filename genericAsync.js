const getGeneric = require('./getGeneric')

const genericAsync = (text, values, onConfig = null) => {

    return new Promise((resolve, reject) => {

        getGeneric(text, values, (resp, error) => {

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

module.exports = genericAsync
