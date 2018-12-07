import { ServerResponse, RequestOptions, ServerRequest, Server } from "http";
import { JSONHandler } from './handlers/JSONhandler';

let http = require('http')

// handle user function
export function execute(r3x: Function, schema: any) {
    console.log("r3x Execute Fired")
    // todo add error handler
    HTTPStream(r3x, schema)
}

// handle http stream,
function HTTPStream(r3x: Function, schema: any){
    let port = process.env.PORT || 8080

    if (port == null) {
        console.log("Error Configuration. Missing Port")
        process.exit(2)
    }

    let functionHandler = (req: ServerRequest, res: ServerResponse) => {
        console.log("Server Hit")
        let input = new JSONHandler()
    
        req.on('error', (err) => {
            console.log('Something went wrong', err)
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
                console.log('Error in function', error)
            }).then(() => {
                res.end()
            })
        })
    }

    let server = http.createServer(functionHandler).listen(port)
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

// handle error
function sendError(resp : any, code : any, error : any){

}