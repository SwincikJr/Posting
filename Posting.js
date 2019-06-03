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
}

module.exports = Posting
