import { ServerResponse, IncomingMessage } from "http";
import { JSONHandler } from './src/handlers/JSONhandler';
import { ErrorHandler } from './src/error/ErrorHandler';
import { FuncSchema } from './src/schema/schemaHandler';
import { Context } from './src/context/Context';
import { join } from "path";

const http = require('http');

const errorRes = new ErrorHandler();

const schema = new FuncSchema();

const exceptionMessage = 'Function Exception';
const fs = require('fs');

/**
 * Function user is visible too
 * Triggers SDK
 * @param r3x {Function}
 */
export function execute(r3x: Function) {
    HTTPStream(r3x);
}

/**
 * Takes users function and handles requests and responses
 * @param r3x {Function}
 */
function HTTPStream(r3x: Function){
    const port = 8080;

    if (port == null) {
        console.log("Error Configuration. Missing Port");
        process.exit(2);
    }
    /**
     * Handles function request and responses
     * @param req {IncomingMessage}
     * @param res {ServerResponse}
     */
    const functionHandler = (req: IncomingMessage, res: ServerResponse) => {
        //declare schema path and get if cors is to be enabled
        const schemaPath = join(__dirname, "schema.json");
        try {
            if (fs.existsSync(schemaPath)) {
                const cors = schema.getSchema(schemaPath).cors;
                if (cors) {
                    //set cors headers
                    setCORS(res);
                }
            }
        } catch(err) {
            errorRes.sendJSONError(res, 502, {message: "No `schema.json` detected" , detail: err.message.toString()});
        }
        
        // declare JSON Handler
        const input = new JSONHandler();

        // Check only POST and OPTIONS request. OPTIONS is allowed for preflight requests
        if (req.method !== 'POST' && req.method !== 'OPTIONS'){
            errorRes.sendJSONError(res, 400, {message: "Invalid method", detail: `${req.method} ${req.url}`});
            return;
        }

        // Handle request
        req.on('error', (err) => {
            errorRes.sendJSONError(res, 502, {message: exceptionMessage , detail: err.message.toString()});
        }).on('data', chunk => {
            // parse request body
            input.pushData(chunk);
        }).on('end', () => {
            const headers = {};
            
            const body = input.getBody();
            const cont = new Context(body, headers);
            cont.responseContentType = 'application/json';

            // handle user function execution
            new Promise((res, rej) => {
                try {
                    return res(r3x(body));
                } catch (err) {
                    rej(err);
                } 
            }).then((result) => {
                return sendResponse(cont, res, result);
            }, (error) => {
                errorRes.sendJSONError(res, 502, {message: exceptionMessage , detail: error.message.toString()});

            }).then(() => {
                res.end();
                res.on('error', (err) => {
                    errorRes.sendJSONError(res, 502, {message: exceptionMessage , detail: err.message.toString()});
                });
            }).catch(err => errorRes.sendJSONError(res, 502, {message: exceptionMessage , detail: err.message.toString()}));
        });
    };

    /**
     * Creates HTTP server
     */
    http.createServer(functionHandler).listen(port)
    .on('error', (error : any) => {
        console.log(`Connection failed to port ${port}`, error);
        process.exit(2);
    });
} 


// handle response
function sendResponse(cont: Context, resp : ServerResponse, result : any){
    const headers = cont._responseHeaders;
    for (const key in headers) {
        if (headers.hasOwnPropery(key)){
            resp.setHeader(key, headers[key]);
        }
    }
    resp.removeHeader('Content-length');
    resp.writeHead(200, 'OK');

    console.log(result);
    let pro : Promise<any> | undefined;
    if(result != null) {
        pro = Promise.resolve(resp.write(JSON.stringify(result)));
    }
    return pro;
}

/**
 * Sets CORS headers
 * @param res {ServerResponse}
 */
function setCORS(res: ServerResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');
}