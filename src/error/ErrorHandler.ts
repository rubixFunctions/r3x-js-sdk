import { ServerResponse} from "http";
import { ErrorJSONMessage } from "./ErrorJSONMessage";

// ErrorHandler, returns error message
class ErrorHandler{
    /**
     * Returns a error response
     * @param resp {ServerResponse}
     * @param code {number}
     * @param error {ErrorJSONMessage}
     */
    sendJSONError(resp: ServerResponse, code: number, error: ErrorJSONMessage){
        const err = JSON.stringify(error);

        console.warn(`Error ${code} : ${err}`);
        resp.setHeader('Content-type', 'application/json');
        resp.writeHead(code, 'internal error');
        resp.end(err);
    }
}

export {ErrorHandler};