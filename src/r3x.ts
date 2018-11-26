import { ServerResponse, RequestOptions, ServerRequest } from "http";
import { JSONHandler } from './handlers/JSONhandler';

let fs = require('fs')
let http = require('http')
let path = require('path')


// handle user function
export function execute(r3x: Function, scheme: any) {
    console.log("r3x Execute Fired")
    // todo add error handler
    HTTPStream(r3x, scheme)
}

// handle http strea,
function HTTPStream(r3x: Function, scheme: any) {
    let functionHandler = (req: ServerRequest, res: ServerResponse) => {
        console.log("Server Hit")
        let input = new JSONHandler()
    
        req.on('data', chunk => {
            input.pushData(chunk)
        }).on('end', () => {
            let headers = {}
            let rewHeaders = req.rawHeaders

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

            })
        })
    }

    let server = http.createServer(functionHandler).listen(8080)

    return () => {
        console.log("Running")
        server
    }
} 


// handle response
function sendResponse(resp : any, result : any){
    console.log("hello bah")
}

// handle error
function sendError(resp : any, code : any, error : any){

}