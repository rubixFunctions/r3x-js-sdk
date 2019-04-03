import { ServerResponse, IncomingMessage } from "http";
import { JSONHandler } from './src/handlers/JSONhandler';
import { ErrorHandler } from './src/error/ErrorHandler'
import { Context } from './src/context/Context'

let http = require('http')

let errorRes = new ErrorHandler()

const exceptionMessage = 'Function Exception'

// handle user function
export function execute(r3x: Function) {
    HTTPStream(r3x)
}

// handle http stream,
function HTTPStream(r3x: Function){
    let port = 8080

    if (port == null) {
        console.log("Error Configuration. Missing Port")
        process.exit(2)
    }

    let functionHandler = (req: IncomingMessage, res: ServerResponse) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Request-Method', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', '*');
        res.setHeader('Content-Type', 'application/json')

        let input = new JSONHandler()

        if (req.method !== 'POST' && req.method !== 'OPTIONS'){
            errorRes.sendJSONError(res, 400, {message: "Invalid method", detail: `${req.method} ${req.url}`})
            return
        }

        req.on('error', (err) => {
            errorRes.sendJSONError(res, 502, {message: exceptionMessage , detail: err.message.toString()})
        }).on('data', chunk => {
            input.pushData(chunk)
        }).on('end', () => {
            let headers = {}
            
            let body = input.getBody()
            let cont = new Context(body, headers)

            cont.responseContentType = 'application/json'

            new Promise(function (res, rej) {
                try {
                    return res(r3x(body))
                } catch (err) {
                    rej(err)
                } 
            }).then((result) => {
                return sendResponse(cont, res, result)
            }, (error) => {
                errorRes.sendJSONError(res, 502, {message: exceptionMessage , detail: error.message.toString()})

            }).then(() => {
                res.end()
                res.on('error', (err) => {
                    errorRes.sendJSONError(res, 502, {message: exceptionMessage , detail: err.message.toString()})
                })
            }).catch(err => errorRes.sendJSONError(res, 502, {message: exceptionMessage , detail: err.message.toString()}))
        })
    }

    http.createServer(functionHandler).listen(port)
    .on('error', (error : any) => {
        console.log(`Connection failed to port ${port}`, error)
        process.exit(2)
    })
} 


// handle response
function sendResponse(cont: Context, resp : ServerResponse, result : any){
    let headers = cont._responseHeaders
    for (let key in headers) {
        if (headers.hasOwnPropery(key)){
            resp.setHeader(key, headers[key])
        }
    }
    resp.removeHeader('Content-length')
    resp.writeHead(200, 'OK')

    console.log(result)
    let pro : Promise<any> | undefined
    if(result != null) {
        pro = Promise.resolve(resp.write(JSON.stringify(result)))
    }
    return pro
}