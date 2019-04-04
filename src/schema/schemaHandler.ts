const fs = require('fs');

interface Schema {
    name : string;
    funcType: string;
    response: string;
    cors: boolean;
}

/* 
* Return
*/
class FuncSchema {
    /**
     * Returns Schema Object
     * @param schemaLocation string
     */
    getSchema(schemaLocation: string) : Schema{
        const rawdata = fs.readFileSync(schemaLocation);  
        const schema: Schema = JSON.parse(rawdata);  
        return schema;
    }
}

export {FuncSchema};