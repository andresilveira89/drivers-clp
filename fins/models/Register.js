import Conexao from '../infrastructure/Conexao.js';
import Verify from '../assets/verify.js';
import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url))

class Register {
    order(values) {
        const verify = new Verify()
        const dados = {...values, ...verify.getShiftandDate()}
        try {
            if (dados.RESPONSE) {
                dados['CONSUMO_M³'] = parseFloat(dados.RESPONSE)
                delete dados.RESPONSE
                delete dados.ADDRESS
                Conexao.record(dados)
            }else {
                console.log("Equipamento offline, a gravação foi interrompida")
            }
        }catch (e) {
            const dadosJSON = JSON.parse(readFileSync(__dirname + '/erros.json'))
            dadosJSON.push({
                DADOS: dados,
                ERRO: e.message
            })
            writeFileSync(__dirname + '/erros.json', JSON.stringify(dadosJSON))
        }
    }
}

export default new Register