const Posting = require('./Posting')
const getConnection = require('./getConnection')
const getObject = require('./getObject')
const getObjects = require('./getObjects')
const insertObject = require('./insertObject')
const updateObject = require('./updateObject')
const deleteObject = require('./deleteObject')
const getGeneric = require('./getGeneric')
const getAsync = require('./getAsync')
const getsAsync = require('./getsAsync')
const genericAsync = require('./genericAsync')
const insertAsync = require('./insertAsync')
const updateAsync = require('./updateAsync')
const deleteAsync = require('./deleteAsync')

module.exports = {
    Posting,
    getConnection,
    getObject,
    getObjects,
    insertObject,
    updateObject,
    deleteObject,
    getGeneric,
    getAsync,
    getsAsync,
    genericAsync,
    insertAsync,
    updateAsync,
    deleteAsync
}
