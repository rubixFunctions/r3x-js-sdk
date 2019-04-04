// Context Interface
export interface ContextInt{
    getConfig(): any; 
    getBody(): any;
    getContentType(): any;
    getHeaders(): {};
    responseHeaders(): {};
    getAllHeaders(key: string): string[];
    getHeader(key: string): string;
    getConfigValue(key: string): string;
    getResponseHeader(key: string): string;
    setResponseHeader(key: string, value: string): void;
    setResponseContentType(type: string): void;
    getResponseContentType(): string;
}