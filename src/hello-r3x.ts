import * as r3x from './r3x'

let schema
r3x.execute(function(){
    let response = {'message' : 'Hello r3x function'}
    return response 
}, schema)