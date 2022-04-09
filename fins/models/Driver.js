import moment from "moment";
import Register from "./Register.js";

export default class Component {
    #name; #address
     constructor(name, address) {
        this.#name = name
        this.#address = address
    }
    analisty(response) {
        
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
    error(response) {
        const values = {
            EQUIPAMENTO: this.#name,
            ADDRESS: this.#address,
            STATUS: "online",
            RESPONSE: 30.3
        }
        Register.order(values)
    }
}