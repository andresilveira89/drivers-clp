import Custumers from './config/custumers.js'
import Conexao from './infrastructure/Conexao.js'
const custumers = Custumers
console.clear()

custumers.forEach((clp) => {
    clp.read()
})
