import moment from "moment";
export default class Driver {
    #name; #address
     constructor(name, address) {
        this.#name = name
        this.#address = address
    }
    reply(response) {
        const values = {
            name: this.#name,
            address: this.#address
        }
        console.log(values)
    }
    error(response) {
        const values = {
            name: this.#name,
            address: this.#address,
            date: moment().format("YYYY-MM-DD HH:mm:ss"),
            response: false
        }
        console.log(values)
    }
}