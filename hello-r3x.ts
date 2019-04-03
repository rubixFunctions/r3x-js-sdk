import * as r3x from './r3x'

// Leaving for local testing
console.log("Execute Started . . . ")
r3x.execute(function(input: any){
	let response;
	if (input.person){
		response = {'message' : `Hello ${input.person}`}
	} else {
		response = {'message' : `Hello RubiX`}
	}
	return response 
})