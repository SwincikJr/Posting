const getConnection = require('./getConnection')
const getObject = require('./getObject')

getConnection(client => {
    console.log('Doing something...')
    client.end()
})
