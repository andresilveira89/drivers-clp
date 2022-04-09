import moment from "moment";
import Register from "./Register.js";
export default class Component {
    #name; #address
    #valuePrevius = 0
     constructor(name, address) {
        this.#name = name
        this.#address = address
    }
    memoryReset() {
        const values = {
            EQUIPAMENTO: this.#name,
            ADDRESS: this.#address,
            STATUS: "online",
            RESPONSE: 0
        }
        Register.order(values)
    }
    reply(response) {
        const value = response.values[0].toFixed(2)
        const values = {
            EQUIPAMENTO: this.#name,
            ADDRESS: this.#address,
            STATUS: "online",
            RESPONSE: value
        }
        if (this.#valuePrevius > value) this.memoryReset()
        this.#valuePrevius = value
        Register.order(values)
    }
    error(response) {
        const values = {
            EQUIPAMENTO: this.#name,
            ADDRESS: this.#address,
            STATUS: "online",
            RESPONSE: 30.3
        }
        console.log(`Error from erro: ${cont}`)
        cont += 1
        Register.order(values)
    }
}