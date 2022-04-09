import Register from "./Register.js";
export default class Component {
    #name; #address
    #valuePrevius = 0
     constructor(name, address) {
        this.#name = name
        this.#address = address
    }
    memoryReset(response) {
        const value = response.values[0].toFixed(2)
        if (this.#valuePrevius > value) {
            const values = {
                EQUIPAMENTO: this.#name,
                ADDRESS: this.#address,
                STATUS: "online",
                RESPONSE: value
            }
            const values2 = {
                EQUIPAMENTO: this.#name,
                ADDRESS: this.#address,
                STATUS: "online",
                RESPONSE: 0
            }
            Register.order(values)
            Register.order(values2)
        }
        this.#valuePrevius = value
    }
    reply(response) {
        const values = {
            EQUIPAMENTO: this.#name,
            ADDRESS: this.#address,
            STATUS: "online",
            RESPONSE: response.values[0].toFixed(2)
        }
        Register.order(values)
    }
    timeout(response) {
        const values = {
            EQUIPAMENTO: this.#name,
            ADDRESS: this.#address,
            STATUS: "online",
            RESPONSE: false
        }
        Register.order(values)
    }
}