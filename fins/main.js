import Custumers from './config/custumers.js'
import Conexao from './infrastructure/Conexao.js'
const custumers = Custumers

custumers.forEach((clp) => {
    clp.read()
})
