import { ServerResponse} from "http";
import { ErrorJSONMessage } from "./ErrorJSONMessage";

// ErrorHandler, returns error message
class ErrorHandler{
    sendJSONError(resp: ServerResponse, code: number, error: ErrorJSONMessage){
        let err = JSON.stringify(error)

        console.warn(`Error ${code} : ${err}`)
        resp.setHeader('Content-type', 'application/json')
        resp.writeHead(code, 'internal error')
        resp.end(err)
    }
}

export {ErrorHandler};