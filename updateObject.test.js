const getObject = require('./getObject')
const insertObject = require('./insertObject')
const updateObject = require('./updateObject')
const Posting = require('./Posting')

// Consulte os Casos de Usos automatizados de updateObject para pré-condições
// Documentação/updateObject/Casos de Uso.txt

test('Alterar dado de classe sem _Key', () => {

    class Carro extends Posting
    {
        constructor(id = null, marca = null, linha = null, modelo = null, ano_modelo = null)
        {
            super()
            this.id = id
            this.marca = marca
            this.linha = linha
            this.modelo = modelo
            this.ano_modelo = ano_modelo
            this.setAuto('id')
        }
    }

    let carros = []

    const callback = resp => {
        expect(resp).toEqual({
            id: carros[1].id,
            marca: 'GM',
            linha: 'Onix',
            modelo: '1.4 Flex',
            ano_modelo: '2015'
        })
    }

    const update = () => {
        carros[0].ano_modelo = '2015'
        updateObject(carros[0], resp => {
            getObject(new Carro(carros[1].id), callback)
        })
    }

    const secondInsert = () => {
        insertObject(new Carro(null, 'GM', 'Celta', '1.0 Flex', '2009'), resp => {
            carros.push(resp)
            update()
        })
    }

    const firstInsert = () => {
        insertObject(new Carro(null, 'GM', 'Onix', '1.4 Flex', '2014'), resp => {
            carros.push(resp)
            secondInsert()
        })
    }

    firstInsert()

})

test('Alterar dado de classe somente com _Key', () => {

    class Filial extends Posting
    {
        constructor(id = null, logradouro = null, endereco = null, numero = null, bairro = null)
        {
            super()
            this.id = id
            this.logradouro = logradouro
            this.endereco = endereco
            this.numero = numero
            this.bairro = bairro
            this.setAuto('id')
            this.setKey('id', 'logradouro', 'endereco', 'numero', 'bairro')
        }
    }

    let objeto = new Filial()

    const callback = resp => {
        expect(resp).toEqual({
            id: objeto.id,
            logradouro: objeto.logradouro,
            endereco: objeto.endereco,
            numero: objeto.numero,
            bairro: objeto.bairro
        })
    }

    const update = (instance) => {
        updateObject(instance, resp => {
            getObject(new Filial(resp.id), callback)
        })
    }

    insertObject(new Filial(null, 'Rua', 'das Conchas', 10, 'Vila Aurora'), resp => {
        objeto.id = resp.id
        objeto.logradouro = resp.logradouro
        objeto.endereco = resp.endereco
        objeto.numero = resp.numero
        objeto.bairro = resp.bairro

        resp.logradouro = 'Avenida'
        resp.endereco = 'da Nação'
        resp.numero = 1012
        resp.bairro = 'Pátria Amada'
        update(resp)
    })

})

test('Alterar dado de classe com atributos _Key e não _Key', () => {

    class Conta extends Posting
    {
        constructor(id = null, email = null, senha = null)
        {
            super()
            this.id = id
            this.email = email
            this.senha = senha
            this.setAuto('id')
            this.setKey('id', 'email')
        }
    }

    let objeto = new Conta()

    const callback = resp => {
        expect(resp).toEqual({
            id: objeto.id,
            email: objeto.email,
            senha: objeto.senha
        })
    }

    const update = (instance) => {
        updateObject(instance, resp => {
            getObject(new Filial(resp.id), callback)
        })
    }

    insertObject(new Conta(null, 'teste@teste.com', 'password01'), resp => {
        objeto.id = resp.id
        objeto.email = resp.email
        objeto.senha = resp.senha
        resp.senha = 'password02'
        update(resp)
    })
})
