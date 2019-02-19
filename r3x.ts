import { ServerResponse, IncomingMessage } from "http";
import { JSONHandler } from './src/handlers/JSONhandler';
import { ErrorHandler } from './src/error/ErrorHandler'

let http = require('http')

let error = new ErrorHandler()

const exceptionMessage = 'Function Exception'

// handle user function
export function execute(r3x: Function, schema: any) {
    HTTPStream(r3x, schema)
}

// handle http stream,
function HTTPStream(r3x: Function, schema: any){
    let port = process.env.PORT || 8080

    if (port == null) {
        console.log("Error Configuration. Missing Port")
        process.exit(2)
    }

    let functionHandler = (req: IncomingMessage, res: ServerResponse) => {
        let input = new JSONHandler()

        if (req.method !== 'POST'){
            error.sendJSONError(res, 400, {message: "Invalid method", detail: `${req.method} ${req.url}`})
            return
        }

        req.on('error', (err) => {
            error.sendJSONError(res, 502, {message: exceptionMessage , detail: err.message.toString()})
        }).on('data', chunk => {
            input.pushData(chunk)
        }).on('end', () => {
            let headers = {}
            let rawHeaders = req.rawHeaders

            let body = input.getBody()

            new Promise(function (res, rej) {
                try {
                    return res(r3x(body))
                } catch (err) {
                    rej(err)
                } 
            }).then((result) => {
                return sendResponse(res, result)
            }, (error) => {
                error.sendJSONError(res, 502, {message: exceptionMessage , detail: error.message.toString()})

            }).then(() => {
                res.end()
                res.on('error', (err) => {
                    error.sendJSONError(res, 502, {message: exceptionMessage , detail: err.message.toString()})
                })
            })
        })
    }

    http.createServer(functionHandler).listen(port)
    .on('error', (error : any) => {
        console.log(`Connection failed to port ${port}`, error)
        process.exit(2)
    })
} 


// handle response
function sendResponse(resp : any, result : any){
    console.log(result)
    resp.writeHead(200, 'OK')
    let pro : Promise<any> | undefined
    if(result != null) {
        pro = Promise.resolve(resp.write(JSON.stringify(result)))
    }
    return pro
}