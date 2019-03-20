class Posting
{
    constructor()
    {
        Object.defineProperty(this, '_Auto', {
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
}

module.exports = Posting
