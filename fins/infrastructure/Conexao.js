import { createConnection } from 'mysql';
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url))
const dados = JSON.parse(readFileSync(__dirname + '/dados.json'))

class Conexao {
    constructor() {
        this.conexao = createConnection(dados)
        this.createTable()
    }
    verifyStatus() {
        if (this.conexao.state === 'disconnected') {
            this.conexao.connect()
            return true
        }else {
            return false
        }
    }
    createTable() {
        const sql = "CREATE TABLE IF NOT EXISTS clp (EQUIPAMENTO text, STATUS varchar(20), TURNO int, DATA datetime, CONSUMO_M³ float)"
        this.conexao.query(sql, (error, result) => {
            if (error) {
                console.log(error)
            }
            else {
                if (result.warningCount === 0) {
                    console.log('Tabela criada com sucesso')
                }
            }
        })
    }
    record(values = {}) {
        const sql = "INSERT INTO clp SET ?"
        this.conexao.query(sql, values, (error, result) => {
            if (error) {
                console.log(error)
            }
            else {
                console.log(result)
            }
        })
    }
}

export default new Conexao