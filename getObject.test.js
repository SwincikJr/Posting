const getObject = require('./getObject')

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
    
    getObject(new Pessoa(1, null), callback)
})

test('Consulta em uma tabela existente e nenhum registro existente.', () => {

    const callback = data => {
        expect(data).toEqual(null)
    }
    
    getObject(new Pessoa(null, 'Inexistente'), callback)
})

test('Consulta em uma tabela existente e muitos registros existentes.', () => {

    const callback = data => {
        expect(data).toEqual(new Pessoa(1, 'Mauro'))
    }
    
    getObject(new Pessoa(), callback)
})

test('Consulta em uma tabela inexistente.', () => {

    const cb = res => { return }
    
    const testingGetObject = () => {
        getObject(new Inexistente(), cb)
        done()
    }

    expect(testingGetObject).toThrow()
})
