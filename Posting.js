class Posting
{
    constructor()
    {
        Object.defineProperty(this, '_Auto', {
            value: [],
            enumerable: false,
            configurable: true
        })

        Object.defineProperty(this, '_Key', {
            value: [],
            enumerable: false,
            configurable: true
        })

        Object.defineProperty(this, '_OneToOneRelationships', {
            value: [],
            enumerable: false,
            configurable: true
        })

        Object.defineProperty(this, '_OneToManyRelationships', {
            value: [],
            enumerable: false,
            configurable: true
        })

        Object.defineProperty(this, '_ManyToManyRelationships', {
            value: [],
            enumerable: false,
            configurable: true
        })
    }

    get _Auto()
    {
        return this._Auto
    }

    set _Auto(value)
    {
        return
    }

    get _Key()
    {
        return this._Key
    }

    set _Key(value)
    {
        return
    }

    get _OneToOneRelationships()
    {
        return this._OneToOneRelationships
    }

    set _OneToOneRelationships(value)
    {
        return
    }

    get _OneToManyRelationships()
    {
        return this._OneToManyRelationships
    }

    set _OneToManyRelationships(value)
    {
        return
    }

    get _ManyToManyRelationships()
    {
        return this._ManyToManyRelationships
    }

    set _ManyToManyRelationships(value)
    {
        return
    }

    setAuto(...values)
    {
        let newAuto = []
        let properties = Object.getOwnPropertyNames(this)

        values.forEach(v => {
            properties.indexOf(v) > -1 ? newAuto.push(v) : null
        })

        Object.defineProperty(this, '_Auto', {
            value: newAuto,
            enumerable: false,
            configurable: true
        })
    }

    setKey(...values)
    {
        let newKey = []
        let properties = Object.getOwnPropertyNames(this)

        values.forEach(v => {
            properties.indexOf(v) > -1 ? newKey.push(v) : null
        })

        Object.defineProperty(this, '_Key', {
            value: newKey,
            enumerable: false,
            configurable: true
        })
    }

    hasOneToOneRelationship(table, originField, destinyField)
    {

        if (
            Object.getOwnPropertyNames(this).indexOf(originField) === -1
        ) 
            return

        let relationships = this._OneToOneRelationships

        relationships.push({
            table,
            originField,
            destinyField
        })

        Object.defineProperty(this, '_OneToOneRelationships', {
            value: relationships,
            enumerable: false,
            configurable: true
        })
    }

    hasOneToManyRelationship(table, originField, destinyField) 
    {
        if (
            Object.getOwnPropertyNames(this).indexOf(originField) === -1
        ) 
            return

        let relationships = this._OneToManyRelationships

        relationships.push({
            table,
            originField,
            destinyField
        })

        Object.defineProperty(this, '_OneToManyRelationships', {
            value: relationships,
            enumerable: false,
            configurable: true
        })
    }

    hasManyToManyRelationship(table, intermediateTable, originField, intermediateOriginField, destinyField, intermediateDestinyField) 
    {
        if (
            Object.getOwnPropertyNames(this).indexOf(originField) === -1
        ) 
            return

        let relationships = this._ManyToManyRelationships

        relationships.push({
            table,
            intermediateTable,
            originField,
            intermediateOriginField,
            destinyField,
            intermediateDestinyField
        })

        Object.defineProperty(this, '_ManyToManyRelationships', {
            value: relationships,
            enumerable: false,
            configurable: true
        })
    }
}

module.exports = Posting
