const orm = require('../index')

// Consulte os Casos de Usos automatizados de deleteObject para pré-condições
// Documentação/deleteObject/Casos de Uso.txt 

class Cliente extends orm.Posting
{
    constructor(id = null, nome = null)
    {
        super()
        this.id = id
        this.nome = nome
        this.setAuto('id')
    }
}

class Documento extends orm.Posting
{
    constructor(id = null, seq = null, titulo = null)
    {
        super()
        this.id = id
        this.seq = seq
        this.titulo = titulo
        this.setAuto('id')
        this.setKey('seq')
    }
}

class Cena extends orm.Posting
{
    constructor(id = null, seq = null, titulo = null)
    {
        super()
        this.id = id
        this.seq = seq
        this.titulo = titulo
        this.setAuto('id')
        this.setKey('id')
    }
}

test('Deleção de objeto sem chave declarada', () => {

    const reg1 = new Cliente(null, 'Pedro')

    const reg2 = new Cliente(null, 'Hebert')

    const reg3 = new Cliente(null, 'Guilherme')

    let check1 = null
    let check2 = null
    let check3 = null

    const insertFirst = () => {
        return new Promise((resolve, reject) => {
            orm.insertObject(reg1, resp => {
                reg1.id = resp.id
                insertSecond().then(() => resolve())
            })
        })
    }

    const insertSecond = () => {
        return new Promise((resolve, reject) => {
            orm.insertObject(reg2, resp => {
                reg2.id = resp.id
                insertThird().then(() => resolve())
            })
        })
    }

    const insertThird = () => {
        return new Promise((resolve, reject) => {
            orm.insertObject(reg3, resp => {
                reg3.id = resp.id
                startTest().then(() => resolve())
            })
        })
    }

    const startTest = () => {
        return new Promise((resolve, reject) => {
            orm.deleteObject(reg1, resp => {
                checkFirst().then(() => resolve())
            })
        })
    }

    const checkFirst = () => {
        return new Promise((resolve, reject) => {
            orm.getObject(reg1, resp => {
                check1 = resp
                checkSecond().then(() => resolve())
            })
        })
    }

    const checkSecond = () => {
        return new Promise((resolve, reject) => {
            orm.getObject(reg2, resp => {
                check2 = resp
                checkThird().then(() => resolve())
            })
        })
    }

    const checkThird = () => {
        return new Promise((resolve, reject) => {
            orm.getObject(reg3, resp => {
                check3 = resp
                resolve()
            })
        })
    }

    expect.assertions(1);

    return insertFirst().then(() => {
        expect([check1, check2, check3]).toEqual([null, null, null])
    })

})

test('Deleção de objeto com chave declarada e sem garantia de unicidade', () => {

    const reg1 = new Documento(null, '001', 'Título A')

    const reg2 = new Documento(null, '001', 'Título B')

    const reg3 = new Documento(null, '002', 'Título C')

    let check1 = null
    let check2 = null
    let check3 = null

    const insertFirst = () => {
        return new Promise((resolve, reject) => {
            orm.insertObject(reg1, resp => {
                reg1.id = resp.id
                insertSecond().then(() => resolve())
            })
        })
    }

    const insertSecond = () => {
        return new Promise((resolve, reject) => {
            orm.insertObject(reg2, resp => {
                reg2.id = resp.id
                insertThird().then(() => resolve())
            })
        })
    }

    const insertThird = () => {
        return new Promise((resolve, reject) => {
            orm.insertObject(reg3, resp => {
                reg3.id = resp.id
                startTest().then(() => resolve())
            })
        })
    }

    const startTest = () => {
        return new Promise((resolve, reject) => {
            orm.deleteObject(reg1, resp => {
                checkFirst().then(() => resolve())
            })
        })
    }

    const checkFirst = () => {
        return new Promise((resolve, reject) => {
            orm.getObject(reg1, resp => {
                check1 = resp
                checkSecond().then(() => resolve())
            })
        })
    }

    const checkSecond = () => {
        return new Promise((resolve, reject) => {
            orm.getObject(reg2, resp => {
                check2 = resp
                checkThird().then(() => resolve())
            })
        })
    }

    const checkThird = () => {
        return new Promise((resolve, reject) => {
            orm.getObject(reg3, resp => {
                check3 = resp
                resolve()
            })
        })
    }

    expect.assertions(1);

    return insertFirst().then(() => {
        expect([check1, check2, check3]).toEqual([null, null, reg3])
    })

})

test('Deleção de objeto com chave declarada e com garantia de unicidade', () => {

    const reg1 = new Cena(null, '001', 'Título A')

    const reg2 = new Cena(null, '001', 'Título B')

    const reg3 = new Cena(null, '002', 'Título C')

    let check1 = null
    let check2 = null
    let check3 = null

    const insertFirst = () => {
        return new Promise((resolve, reject) => {
            orm.insertObject(reg1, resp => {
                reg1.id = resp.id
                insertSecond().then(() => resolve())
            })
        })
    }

    const insertSecond = () => {
        return new Promise((resolve, reject) => {
            orm.insertObject(reg2, resp => {
                reg2.id = resp.id
                insertThird().then(() => resolve())
            })
        })
    }

    const insertThird = () => {
        return new Promise((resolve, reject) => {
            orm.insertObject(reg3, resp => {
                reg3.id = resp.id
                startTest().then(() => resolve())
            })
        })
    }

    const startTest = () => {
        return new Promise((resolve, reject) => {
            orm.deleteObject(reg1, resp => {
                checkFirst().then(() => resolve())
            })
        })
    }

    const checkFirst = () => {
        return new Promise((resolve, reject) => {
            orm.getObject(reg1, resp => {
                check1 = resp
                checkSecond().then(() => resolve())
            })
        })
    }

    const checkSecond = () => {
        return new Promise((resolve, reject) => {
            orm.getObject(reg2, resp => {
                check2 = resp
                checkThird().then(() => resolve())
            })
        })
    }

    const checkThird = () => {
        return new Promise((resolve, reject) => {
            orm.getObject(reg3, resp => {
                check3 = resp
                resolve()
            })
        })
    }

    expect.assertions(1);

    return insertFirst().then(() => {
        expect([check1, check2, check3]).toEqual([null, reg2, reg3])
    })

})
