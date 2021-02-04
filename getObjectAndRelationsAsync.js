const getObjectAndRelations = require('./getObjectAndRelations')

const getObjectAndRelationsAsync =  (instance, relations, onConfig) => {
    return new Promise((resolve, reject) => {
        getObjectAndRelations(instance, relations, (resp, error) => {
            if(error) {
                reject(error)
            } else {
                resolve(resp)
            }
        }, onConfig)
    })
}

module.exports = getObjectAndRelationsAsync
