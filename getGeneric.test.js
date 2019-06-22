const getGeneric = require('./getGeneric')

// Consulte os Casos de Usos automatizados de getGeneric para pré-condições
// Documentação/getGeneric/Casos de Uso.txt 

test('Execução de query não parametrizada com retorno', () => {

    let query = 'select nome, modalidade from atleta'

    let expected = [ 
        { nome: 'Marta', modalidade: 'Futebol' },
        { nome: 'Michael Jordan', modalidade: 'Basquete' },
        { nome: 'Daniel Negreanu', modalidade: 'Poker' } 
    ]

    getGeneric(query, null, resp => {
        expect(resp).toEqual(expected)
    })

})

test('Execução de query parametrizada com 1 valor e com retorno', () => {

    let query = 'select nome, modalidade from atleta where modalidade = $1'
    let values = ['Futebol']

    let expected = [{ nome: 'Marta', modalidade: 'Futebol' }]

    getGeneric(query, values, resp => {
        expect(resp).toEqual(expected)
    })

})

test('Execução de query parametrizada com 2 valores e com retorno', () => {

    let query = 'select nome, modalidade from atleta where modalidade in ($1, $2)'
    let values = ['Basquete', 'Poker']

    let expected = [ 
        { nome: 'Michael Jordan', modalidade: 'Basquete' },
        { nome: 'Daniel Negreanu', modalidade: 'Poker' } 
    ]

    getGeneric(query, values, resp => {
        expect(resp).toEqual(expected)
    })

})

test('Execução de query sem retorno', () => {

    let query1 = 'delete from musica'
    let query2 = "insert into musica(autor, nome, ano) values ('John Lennon', 'Imagine', 1971)"
    let query3 = "select * from musica"

    let expected1 = []
    let expected2 = [{ autor: 'John Lennon', nome: 'Imagine', ano: 1971 }]

    let result1
    let result2

    const deleteAll = () => {
        return new Promise((resolve, reject) => {
            getGeneric(query1, null, resp => {
                executeQuery().then(() => resolve())
            })
        })
    }

    const executeQuery = () => {
        return new Promise((resolve, reject) => {
            getGeneric(query2, null, resp => {
                result1 = resp
                checkInserted().then(() => resolve())
            })
        })
    }

    const checkInserted = () => {
        return new Promise((resolve, reject) => {
            getGeneric(query3, null, resp => {
                result2 = resp
                resolve()
            })
        })
    }

    return deleteAll().then(() => {
        expect([result1, result2]).toEqual([expected1, expected2])
    })

})

test('Execução de query parametrizada com número de parâmetros diferente dos valores informados', () => {

    let query = 'select * from atleta where modalidade = $1'
    let values = ['Poker', 'Daniel Negreanu']

    let erro = false

    const executeQuery = () => {
        return new Promise((resolve, reject) => {
            getGeneric(query, values, (resp, error) => {
                if(error)
                {
                    reject(error)
                }
                else
                {
                    resolve(resp)
                }
            })
        })
    }

    const teste = () => {
        return new Promise((resolve, reject) => {
            executeQuery().catch(error => {
                erro = true
            }).finally(() => resolve())
        })
    }

    return teste().then(() => {
        expect(erro).toEqual(true)
    })

})
