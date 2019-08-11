const orm = require('./index')

// Consulte os Casos de Usos automatizados de getObject para pré-condições
// Documentação/getObject/Casos de Uso.txt

class Jogo
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


test('Consulta em uma tabela com dois registros, mas retornando apenas um.', () => {

    const callback = data => {
        let jogo = new Jogo(1, 'Uncharted')
        jogo = [jogo]

        expect(data).toEqual(jogo)
    }
    
    orm.getObjects(new Jogo(1, 'Uncharted'), callback)
})


test('Consulta em uma tabela com dois registros e retornando os dois.', () => {

    let item1 = new Jogo(1, 'Uncharted')
    let item2 = new Jogo(2, 'Resident Evil 4')

    let expected = [item1, item2]

    const callback = data => {
        expect(data).toEqual(expected)
    }
    
    orm.getObjects(new Jogo(), callback)
})


test('Consulta em uma tabela existente e nenhum registro existente.', () => {

    const callback = data => {
        expect(data).toEqual([])
    }
    
    orm.getObjects(new Jogo(null, 'Inexistente'), callback)
})

test('Consulta em uma tabela inexistente.', () => {

    let erro = false;

    const tryGet = () => {
        return new Promise((resolve, reject) => {
            orm.getObjects(new Inexistente(), (resp, err) => {
                if (err)
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

    let jogo = new Jogo();
    jogo.inexistente = 'inexistente';

    let erro = false;

    const tryGet = () => {
        return new Promise((resolve, reject) => {
            orm.getObjects(jogo, (resp, err) => {
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