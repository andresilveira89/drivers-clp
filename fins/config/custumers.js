import Driver from '../controllers/Driver.js';
import clps from './clps.js';
const Custumers = []

clps.forEach(value => {
    Custumers.push(new Driver(value.name, value.address, value.port, value.memory, value.range))
})

export default Custumers