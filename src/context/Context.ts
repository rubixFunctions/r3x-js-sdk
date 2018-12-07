export interface Context{
    getConfig(): any 
    getBody(): any
    getContentType(): any
    getHeaders(): Object
    responseHeaders(): Object
    getAllHeaders(key: string): Array<string>
    getHeader(key: string): string
    getConfigValue(key: string): string
    getResponseHeader(key: string): string
    setResponseHeader(key: string, value: string): void
    setResponseContentType(type: string): void
    getResponseContentType(): string
}