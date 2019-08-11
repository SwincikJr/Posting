const orm = require('./index')

// Consulte os Casos de Usos automatizados de getObject para pré-condições
// Documentação/getObject/Casos de Uso.txt

class Pessoa
{
    constructor(id = null, nome = null)
    {
        this.id = id
        this.nome = nome
    }
}

class Inexistente
{

}

test('Consulta em uma tabela existente e um registro existente.', () => {

    const callback = data => {
        expect(data).toEqual(new Pessoa(1, 'Mauro'))
    }
    
    orm.getObject(new Pessoa(1, null), callback)
})

test('Consulta em uma tabela existente e nenhum registro existente.', () => {

    const callback = data => {
        expect(data).toEqual(null)
    }
    
    orm.getObject(new Pessoa(null, 'Inexistente'), callback)
})

test('Consulta em uma tabela existente e muitos registros existentes.', () => {

    const callback = data => {
        expect(data).toEqual(new Pessoa(1, 'Mauro'))
    }
    
    orm.getObject(new Pessoa(), callback)
})

test('Consulta em uma tabela inexistente.', () => {

    let erro = false;

    const tryGet = () => {
        return new Promise((resolve, reject) => {
            orm.getObject(new Inexistente(), (resp, err) => {
                if(err)
                {
                    reject()
                }
                else
                {
                    resolve()
                }
            })
        })
    }
    
    return tryGet()
        .catch(() => { erro = true })
        .finally(() => expect(erro).toEqual(true))
    
})

test('Consulta em uma tabela existente buscando por campo inexistente', () => {

    let pessoa = new Pessoa()
    pessoa.inexistente = 'inexistente'

    let erro = false;

    const tryGet = () => {
        return new Promise((resolve, reject) => {
            orm.getObject(pessoa, (resp, err) => {
                if(err)
                {
                    reject()
                }
                else
                {
                    resolve()
                }
            })
        })
    }
    
    return tryGet()
        .catch(() => { erro = true })
        .finally(() => expect(erro).toEqual(true))

})
