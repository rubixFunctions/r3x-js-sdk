import * as r3x from './r3x'

// Leaving for local testing

let schema
console.log("Execute Started . . . ")
r3x.execute(function(){
	let response = {'message' : 'Hello r3x function'}
	return response 
}, schema)