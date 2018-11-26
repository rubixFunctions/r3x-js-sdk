import { ServerResponse, RequestOptions, ServerRequest } from "http";
import { JSONHandler } from './handlers/JSONhandler';

let fs = require('fs')
let http = require('http')
let path = require('path')


// todo handle user function
export function execute(r3x: Function, scheme: any) {
    // todo add error handler
    HTTPStream(r3x, scheme)
}


function HTTPStream(r3x: Function, scheme: any) {

    let functionHandler = (req: ServerRequest, res: ServerResponse) => {
        let input = new JSONHandler()

        req.on('data', chunk => {
            input.pushData(chunk)
        }).on('end', () => {
            let headers = {}
            let rewHeaders = req.rawHeaders

        })
    }

    let server = http.createServer(functionHandler).listen(8080)

    return () => {
        server
    }
} 