import { Handler } from "./Handler";

// JSON Handler to parse body of incoming request
class JSONHandler implements Handler {
    str: string;
    constructor() {
        this.str = '';
    }

    /**
     * Pushs JSON data to a string
     * @param data JSON
     */
    pushData (data : JSON) {
        this.str += data;
    }

    /**
     * Parses JSON string
     */
    getBody () {
        try {
            return JSON.parse(this.str);
        } catch (e) {
            return this.str;
        }
    }
}

export { JSONHandler };