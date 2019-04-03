const fs = require('fs');

interface schema {
    name : string;
    funcType: string;
    response: string;
    cors: boolean
}

/* 
* Return
*/
class FuncSchema {
    /**
     * Returns Schema Object
     * @param schemaLocation string
     */
    public getSchema(schemaLocation: string) : any{
        let rawdata = fs.readFileSync(schemaLocation);  
        let schema: schema = JSON.parse(rawdata);  
        return schema
    }
}

export {FuncSchema}