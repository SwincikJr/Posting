const PostingClass = require('./Posting')
const getConnection = require('./getConnection')
const getObject = require('./getObject')
const insertObject = require('./insertObject')
const updateObject = require('./updateObject')
const deleteObject = require('./deleteObject')
const getGeneric = require('./getGeneric')

module.exports = {
    PostingClass,
    getConnection,
    getObject,
    insertObject,
    updateObject,
    deleteObject,
    getGeneric
}
