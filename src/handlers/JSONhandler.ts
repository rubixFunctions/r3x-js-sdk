import { Handler } from "./Handler";

// JSON Handler to parse body of incoming request
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