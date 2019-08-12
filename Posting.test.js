const orm = require('./index')

// Consulte os Casos de Usos automatizados de Posting para pré-condições
// Documentação/Posting/Casos de Uso.txt

class Teste extends orm.Posting
{
    constructor()
    {
        super()
        this.atr1 = 1
        this.atr2 = 2
        this.atr3 = 3
    }
}

// _Auto

test('Uso correto de setAuto()', () => {

    let teste = new Teste()
    teste.setAuto('atr1', 'atr2')
    expect(teste._Auto).toEqual(['atr1', 'atr2'])

})

test('Nova instância de classe herdeira de Posting', () => {

    let teste = new Teste()
    expect(teste._Auto).toEqual([])

})

test('Tentativa de inclusão de propriedade inexistente através de setAuto()', () => {

    let teste = new Teste()
    teste.setAuto('atr1', 'inexistente')
    expect(teste._Auto).toEqual(['atr1'])

})

test('Tentativa de alteração da propriedade _Auto sem utilizar setAuto()', () => {

    let teste = new Teste()
    teste._Auto = ['atr1']
    expect(teste._Auto).toEqual([])

})

// _Key

test('Uso correto de setKey()', () => {

    let teste = new Teste()
    teste.setKey('atr1', 'atr2')
    expect(teste._Key).toEqual(['atr1', 'atr2'])

})

test('Nova instância de classe herdeira de Posting', () => {

    let teste = new Teste()
    expect(teste._Key).toEqual([])

})

test('Tentativa de inclusão de propriedade inexistente através de setKey()', () => {

    let teste = new Teste()
    teste.setKey('atr1', 'inexistente')
    expect(teste._Key).toEqual(['atr1'])

})

test('Tentativa de alteração da propriedade _Auto sem utilizar setKey()', () => {

    let teste = new Teste()
    teste._Key = ['atr1']
    expect(teste._Key).toEqual([])

})
