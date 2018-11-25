import * as r3x from './r3x'

let scheme 

r3x.execute(function(){
    let response = {'message' : 'Hello r3x function'}
    return response 
}, scheme)