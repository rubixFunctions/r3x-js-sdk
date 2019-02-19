
export class Context {
    _payload: string
    _headers: any
    _responseHeaders: any
    responseContentType: string


    constructor(payload: string, headers: any){
        this._payload = payload
        this._headers = headers
        this._responseHeaders = {}
        this.responseContentType = ""
    }
}