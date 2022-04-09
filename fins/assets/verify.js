import { readFileSync, writeFileSync } from 'fs'
import moment from 'moment'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url))

export default class Verify {
    constructor() {
        this.rowdata = readFileSync(__dirname + '/verify.json')
        this.DATA = moment().format("YYYY-MM-DD HH:mm:ss")
        this.time = moment(this.DATA).format("HH:mm:ss")
        this.verificador = JSON.parse(this.rowdata)[0]
        this.run()
    }
    run() {
        if (this.time >= '06:00:00' && this.time < '14:00:00') {
            if (this.verificador["Turno1"] == false) {
                this.json = JSON.stringify([
                    {
                        Turno1: true,
                        Turno2: false,
                        Turno3: false
                    }
                ])
                writeFileSync(__dirname + '/verify.json', this.json)
            }
            this.TURNO = 1
        } else if (this.time >= '14:00:00' && this.time < '22:00:00') {
            if (this.verificador["Turno2"] == false) {
                this.json = JSON.stringify([
                    {
                        Turno1: false,
                        Turno2: true,
                        Turno3: false
                    }
                ])
                writeFileSync(__dirname + '/verify.json', this.json)
            }
            this.TURNO = 2
        } else {
            if (this.verificador["Turno3"] == false) {
                this.json = JSON.stringify([
                    {
                        Turno1: false,
                        Turno2: false,
                        Turno3: true
                    }
                ])
                writeFileSync(__dirname + '/verify.json', this.json)
            }
            this.TURNO = 3
        }
    }
    getShiftandDate() {
        return {TURNO: this.TURNO, DATA: this.DATA}
    }
}