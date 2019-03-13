import * as r3x from './r3x'

// Leaving for local testing

let schema
console.log("Execute Started . . . ")
r3x.execute(function(input: any){
	let response = {'message' : `${input.dictate}`}
	return response 
}, schema)