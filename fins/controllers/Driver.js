import { FinsClient } from 'omron-fins-es6';
import Component from '../models/Driver.js';

export default class Driver extends Component {
    #port; #address; #options; #clp; #clpAnalist; #memory; #range; #reply; #timeout; #memoryReset;
    #stopedAnalist = true
    constructor(name, address, port, memory, range, timeout=5000) {
        super(name, address)
        this.#reply = this.reply.bind(this)
        this.#timeout = this.timeout.bind(this)
        this.#memoryReset = this.memoryReset.bind(this)
        this.#address = address
        this.#port = port
        this.#memory = memory
        this.#range = range
        this.#options = { timeout: timeout }
        this.connect()
    }
    connect() {
        this.#clp = new FinsClient(this.#port, this.#address, this.#options, true)
        this.#clpAnalist = new FinsClient(this.#port, this.#address, this.#options, true)
    }
    read() {
        this.#clp.on('reply', this.#reply)
        this.#clp.on('timeout', this.#timeout)
        this.#clp.read(this.#memory, this.#range, function() {})
        if (this.#stopedAnalist) {
            this.routineAnalist()
            this.#stopedAnalist = false
        }
    }
    memoryAnalist(){
        this.#clpAnalist.on('reply', this.#memoryReset)
        this.#clpAnalist.on('timeout', this.#timeout)
        this.#clpAnalist.read(this.#memory, this.#range, function() {})
    }
    routineAnalist() {
        setInterval(() => {
            this.memoryAnalist()
        }, 5000)
    }
}