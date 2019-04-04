// Json Handler Interface
export interface Handler {
    pushData(data : JSON) : void;
    getBody() : void;
}