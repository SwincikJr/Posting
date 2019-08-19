const Posting = require('./Posting')
const getConnection = require('./getConnection')
const getObject = require('./getObject')
const getObjects = require('./getObjects')
const insertObject = require('./insertObject')
const updateObject = require('./updateObject')
const deleteObject = require('./deleteObject')
const getGeneric = require('./getGeneric')
const getAsync = require('./getAsync')

module.exports = {
    Posting,
    getConnection,
    getObject,
    getObjects,
    insertObject,
    updateObject,
    deleteObject,
    getGeneric,
    getAsync
}
