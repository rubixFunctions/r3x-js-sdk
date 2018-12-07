import { Handler } from "./Handler";

class JSONHandler implements Handler {
    str: string;
    constructor() {
        this.str = ''
    }

    pushData (data : JSON) {
        this.str += data
    }

    getBody () {
        try {
            return JSON.parse(this.str)
        } catch (e) {
            return this.str
        }
    }
}

export { JSONHandler };