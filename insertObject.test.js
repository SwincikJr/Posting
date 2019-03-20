const Posting = require('./Posting')
const insertObject = require('./insertObject')

// Consulte os Casos de Usos automatizados de insertObject para pré-condições
// Documentação/insertObject/Casos de Uso.txt

test('Inserir dado em tabela existente', () => {

    class Aluno extends Posting
    {
        constructor(id = null, nome = null, curso = null)
        {
            super()
            this.id = id
            this.nome = nome
            this.curso = curso
            this.setAuto('id')
        }
    }

    const callback = data => {
        expect(data.id).not.toEqual(null)
    }

    insertObject(new Aluno(null, 'Mauro', 'ADS'), callback)

})

test('Inserir dado em tabela existente somente com auto', () => {

    class Aluno extends Posting
    {
        constructor(id = null, nome = null, curso = null)
        {
            super()
            this.id = id
            this.nome = nome
            this.curso = curso
            this.setAuto('id', 'nome', 'curso')
        }
    }

    const callback = data => {
        expect(data.id).not.toEqual(null)
    }

    insertObject(new Aluno(null, 'Mauro', 'ADS'), callback)

})

test('Inserir dado em tabela inexistente', () => {

    class Inexistente
    {
        constructor()
        {
            this.propriedade = null
        }
    }

    expect(() => {
        insertObject(new Inexistente(), resp => { return })
        done()
    }).toThrow()

})

test('Inserir dado em tabela existente e campo inexistente', () => {

    class Aluno 
    {
        constructor()
        {
            this.inexistente = 0
        }
    }

    expect(() => {
        insertObject(new Aluno(), resp => { return })
        done()
    }).toThrow()

})

test('Inserir dados em tabela existente, campos existentes porém com tipo de dado diferente da tabela', () => {

    class Aluno extends Posting
    {
        constructor()
        {
            super()
            this.id = null
            this. nome = 0
            this.curso = 0
            this.setAuto('id')
        }
    }

    const callback = resp => {
        expect(resp.id).not.toEqual(null)
    }

    insertObject(new Aluno(), callback)

})
