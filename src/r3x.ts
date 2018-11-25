import { ServerResponse, RequestOptions } from "http";

let fs = require('fs')
let http = require('http')
let path = require('path')


// todo handle user function
export function execute(r3x: void, scheme: any) {
}


function HTTPStream(r3x: void, scheme: any) {

    let functionHandler = (req: RequestOptions, res: ServerResponse) => {
    }

    let server = http.createServer(functionHandler).listen(8080)
    
    return () => {
        server
    }
} 