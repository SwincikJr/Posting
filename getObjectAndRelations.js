const getConnection = require('./getConnection')

const joinOptions = {
    i: 'inner',
    l: 'left',
    r: 'right'
}

const addRelationshipObject = (relationships, reference, related, oneToOne) => {
    relationships.push({
        property: `_${related}${!oneToOne ? 's' : ''}`,
        tableName: related,
        childOf: reference.constructor.name,
        oneToOne
    })
}

const getRelationship = (reference, related, relationships) => {

    let relatedObject = reference._OneToOneRelationships.find(r => { return r.table === related })

    if (relatedObject) {
        /** 1:1 */
        addRelationshipObject(relationships, reference, related, true)
        return relatedObject
    }

    relatedObject = 
        reference._OneToManyRelationships.find(r => { return r.table === related })
        || reference._ManyToManyRelationships.find(r => { return r.table === related })

    if (relatedObject) {
        /** 1:N OR N:M */
        addRelationshipObject(relationships, reference, related, false)
        return relatedObject
    }

    return null
}

const additionalParameters = (instance, values) => {

    let filter = ''
    let count = values.length
    const table = instance.constructor.name

    Object.getOwnPropertyNames(instance).forEach(element => {
        if (instance[element] != null && instance[element] != undefined && Object.getOwnPropertyDescriptor(instance, element).enumerable) 
        {
            filter += ` and public."${table}"."${element}" = $${++count}`
            values.push(instance[element])
        }
    });

    return filter
}

const oneToOneJoinSlice = (joinOption, reference, relation, relationship) => {
    return `
        ${joinOption} join public."${relation.model.constructor.name}"
        on public."${reference.constructor.name}"."${relationship.originField}" 
            = public."${relation.model.constructor.name}"."${relationship.destinyField}"
    `
}

const manyToManyJoinSlice = (joinOption, reference, relation, relationship) => {
    return `
        ${joinOption} join public."${relationship.intermediateTable}"
        on public."${relationship.intermediateTable}"."${relationship.intermediateOriginField}"
            = public."${reference.constructor.name}"."${relationship.originField}"
        ${joinOption} join public."${relation.model.constructor.name}"
        on public."${relation.model.constructor.name}"."${relationship.destinyField}"
            = public."${relationship.intermediateTable}"."${relationship.intermediateDestinyField}"
    `
}

const buildJoinSlice = (reference, relation, values, relationships) => {

    const relationship = getRelationship(reference, relation.model.constructor.name, relationships)

    if (!relationship) return ''

    const joinOption = joinOptions[relation.join] || 'inner'

    let joinSlice = relationship.intermediateTable 
        ? manyToManyJoinSlice(joinOption, reference, relation, relationship)
        : oneToOneJoinSlice(joinOption, reference, relation, relationship)

    joinSlice += additionalParameters(relation.model, values)

    if (relation.relations) {
        relation.relations.forEach(r => {
            joinSlice += buildJoinSlice(relation.model, r, values, relationships)
        })
    }

    return joinSlice
}

const buildAdditionalFields = relation => {
    let additionalFields = ''
    Object.getOwnPropertyNames(relation.model).forEach(property => {
        if (Object.getOwnPropertyDescriptor(relation.model, property).enumerable) {
            const { name } = relation.model.constructor
            additionalFields += `, "${name}"."${property}" as "${name}_${property}"`
        }
    })
    if (relation.relations) {
        relation.relations.forEach(r => {
            additionalFields += buildAdditionalFields(r)
        })
    }
    return additionalFields
}

const addResponseObject = (instance, row, response) => {
    const newResponseObject = {}
    Object.assign(newResponseObject, instance)
    Object.getOwnPropertyNames(newResponseObject).forEach(property => {
        if (Object.getOwnPropertyDescriptor(newResponseObject, property).enumerable) {
            newResponseObject[property] = row[`${instance.constructor.name}_${property}`]
        }
    })
    response.push(newResponseObject)
    return newResponseObject
}

const buildKey = (reference, row) => {
    const key = {}
    reference._Key.forEach(k => {
        key[k] = row[`${reference.constructor.name}_${k}`]
    })
    return key
}

const findPreviousByKey = (response, reference, key, row) => {
    return response.find(r => {
        let hasPrevious = true
        Object.getOwnPropertyNames(key).forEach(k => {
            hasPrevious = hasPrevious && r[k] === row[`${reference.constructor.name}_${k}`]
        })
        return hasPrevious
    })
}

const getResponseObjectReference = (row, reference, response) => {
    if (reference._Key && reference._Key.length) {
        const key = buildKey(reference, row)
        const previous = findPreviousByKey(response, reference, key, row)
        return previous || addResponseObject(reference, row, response)
    }
    return addResponseObject(reference, row, response)
    
}

const addRelationResponse = (row, relation, relationships, responseReference) => {
    const relationshipInfo = relationships.find(r => { return r.tableName === relation.model.constructor.name })
    if (relationshipInfo.oneToOne) {
        responseReference[relationshipInfo.property] = getResponseObjectReference(row, relation.model, [])
        return responseReference[relationshipInfo.property]
    } else {
        if (!responseReference[relationshipInfo.property]) {
           responseReference[relationshipInfo.property] = []
        }
        return getResponseObjectReference(row, relation.model, responseReference[relationshipInfo.property])    
    }
}

const checkRelations = (row, relations, relationships, responseReference) => {
    relations.forEach(relation => {
        const relationResponse = addRelationResponse(row, relation, relationships, responseReference)
        if (relation.relations) {
            checkRelations(row, relation.relations, relationships, relationResponse)
        }
   })
}

const normalizeResponse = (rows, instance, relations, relationships) => {
    const response = []
    rows.forEach(row => {
       const responseReference = getResponseObjectReference(row, instance, response)
       checkRelations(row, relations, relationships, responseReference)
    })
    response.forEach(r => {
        console.log(JSON.stringify(r))
    })
    return response
}

module.exports = (instance, relations, callback, onConfig = null) => {

    let join = ''
    let additionalFields = buildAdditionalFields({ model: instance })
    const values = []
    const relationships = []

    relations.forEach(r => {
        join += buildJoinSlice(instance, r, values, relationships)
        additionalFields += buildAdditionalFields(r)
    })

    let query = `
        select '' as _posting_controller ${additionalFields} 
        from public."${instance.constructor.name}" 
        ${join}
        where 1 = 1 ${additionalParameters(instance, values)}
    `

    console.log(query)

    getConnection((client, error) => {

        if(!error)
        {
            client.query({ text: query, values }, (err, res) => {
                if (err)
                {
                    callback(null, err)
                }
                else if (!res.rows.length)
                {
                    callback([], false)
                }
                else
                {
                    const response = normalizeResponse(res.rows, instance, relations, relationships) 
                    callback(response, false)
                }
                client.end()
            })
        }
        else
        {
            callback(null, error)
        }

    }, onConfig)
}