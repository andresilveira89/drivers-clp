import { FinsClient } from 'omron-fins';
import Component from '../models/Driver.js';

export default class Driver extends Component {
    #port; #address; #timeout; #clp; #memory; #range; #reply; #error
    constructor(name, address, port, memory, range, timeout=5000) {
        super(name, address)
        this.#reply = this.reply.bind(this)
        this.#analisty = this.analisty.bind(this)
        this.#error = this.error.bind(this)
        this.#address = address
        this.#port = port
        this.#memory = memory
        this.#range = range
        this.#timeout = { timeout: timeout }
        this.connect()
    }
    connect() {
        this.#clp = FinsClient(this.#port, this.#address, this.#timeout)
    }
    read() {
        this.#clp.on('reply', this.#reply)
        this.#clp.on('error', this.#error)
        this.#clp.read(this.#memory, this.#range)
    }
    memoryAnalist(){
        this.#clp.on('reply', this.#analisty)
        this.#clp.read(this.#memory, this.#range)
    }
}