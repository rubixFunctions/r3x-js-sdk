import { Context } from "./Context";

class ContextHandler implements Context{
    config : any
    payload : any
    headers : any
    responseHeaders: any

    constructor(config : any, payload : any, headers : any){
        this.config = config
        this.payload = payload
        this.headers = headers
        this.responseHeaders = {}
    }

    
    /**
     * Returns Configuration
     */
    getConfig(): any {
        let conf = {}
        Object.assign(conf, this.config)
        return conf
    }

    /**
     * Returns body of the Request
     */
    getBody(): any {
        return this.payload
    }

    /**
     * Returns the content type
     */
    getContentType(): any {
        return this.getHeader('Content-Type')
    }

    /**
     * Return all headers
     */
    getHeaders(): any {
        return this.headers
    }

    /**
     * Returns a copy of the headers to be used in Res
     */
    getResponseHeaders(): Object {
        let headers = {}
        Object.assign(headers, this.responseHeaders)
        return headers
    }

    /**
     * Returns all headers for a specific key
     * @param key {string}
     */
    getAllHeaders(key: string): Array<string> {
        let h = this.headers[key]
        if (h == null) {
            return []
        }
        return h.slice(0)
    }

    /**
     * Returns a header for a specific key
     * @param key {string}
     */
    getHeader(key: string): string {
        let h = this.headers[key]
        if (h == null){
            return ''
        }
        return h[0]
    }
    /**
     * Returns a config value for a specific key
     * @param key {string}
     */
    getConfigValue(key: string): string {
        return this.config.get(key)
    }

    /**
     * Returns a header for a specific key
     * @param key {string}
     */
    getResponseHeader(key: string): string {
        let h = this.responseHeaders[key]
        if (h == null){
            return ''
        }
        return h[0]
    }

    /**
     * Sets response header
     * @param key {string}
     * @param value {string}
     */
    setResponseHeader(key: string, value: string): void {
        this.responseHeaders[key] = value
    }

    /**
     * Sets response content
     * @param type {string}
     */
    setResponseContentType(type: string): void {
        this.setResponseHeader('Content-Type', type)
    }

    /**
     * Get res content type
     */
    getResponseContentType(): string {
        return this.getResponseHeader('Content-Type')
    }



}