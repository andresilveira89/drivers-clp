import Driver from '../controllers/driver.js';
import clps from './clps.js';
const data = []

clps.forEach(value => {
    data.push(new Driver(value.name, value.address, value.port, value.memory, value.range))
})

export default data