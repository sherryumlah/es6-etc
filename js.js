// STRICT MODE
/* strict mode means a variable has to be declared before it is used
it makes debugging easier. Also keeps you from using reserved words.
It also doesn't let you delete vars and functions nor arguments
to functions.
*/

function usingStrictMode(){
	"use strict"; 
	var myUndefinedVar; // uncomment 
	myUndefinedVar = "Nope - I produce a reference error!";
}

function notUsingStrictMode(){
	myUndefinedVar2 = "I can slip on by unnoticed.";
}

usingStrictMode();
notUsingStrictMode();

// VARIABLE HOISTING
/* Variable hoisting: JS bumps var declarations (not their assigned values) 
to the top of the scope in which they're defined in */
console.log(a); // appears as undefined
var a=1;
/*  
This block essentially gets reorganized by JS when 
the var declaration is hoisted to the top of the scope:
var a;
console.log(a);
a=1; 
*/

// LET & CONST
/* LET vs. VAR vs. CONST - Let and const don't have variable hoisting */
console.log(example);
var example = 'example'; // shows as undefined

//console.log(example2);
let example2 = 'example2'; //produces a reference error

//console.log(example3);
const example3 = 'example3'; //produces a reference error, also can't reassign its value (but you can update subproperties)


// IFFEs
/*IFFE = immediately invoked function expression */
function notIffe(){
	console.log('not iffe');
}

(function iffe(){
	console.log('i am iffe');
})();


// ARROW FUNCTIONS
/* Fat arrow functions are anonymous: not named and not bound to an identifier. 
Frequently used in callback chains, proomise chains, array  methods - where unregistered functions are helpful.
Arrow functions are not assigned a THIS scope - they inherit their paren't THIS scope. 
Arrow functions are best with anything that requires this to be bound to the context, and not the function itself.
*/
let arg = "I'm an argument!";
const fn1 = function(argument){ console.log(argument); };
fn1(arg);

// Rewritten as arrow function:
const fn2 = argument => { 
	console.log(argument); 
	console.log("I am multi-lined!");
};
fn2(arg);

const fn3 = argument => console.log("I am single-lined!", argument);
fn3(arg);

const fn4 = (argument1, argument2) => console.log(argument1, argument2);
fn4("I'm an argument", "with multiple args");

// ES5 - need to bind this scope to parent
var obj = {
	id: 42,
	counter: function counter(){
		setTimeout(function() {
			console.log(this.id);
		}.bind(this), 500);
	}
};

// ES6 - anonymous function arrow syntax means it inherits parent's this scope
var obj2 = {
	id: 43,
	counter: function counter(){
		setTimeout(() => {
			console.log(this.id);
		}, 500);
	}
};

obj.counter();
obj2.counter();


// Async / Await
async function fAwait() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("Promise is done!"), 6000)
  });

  let result = await promise; // will wait till the promise resolves
  console.log(result);
}

fAwait();
console.log("We're waiting on the promise to resolve...");

// Async with Promises
async function first(){
	return "I";
}

async function second(i){
	console.log(i);
	return "am";
}

first().then(second).then(console.log); // doesn't block the code after this
console.log("Yoda,"); // appears before "I" and "am"

setTimeout(() => { 
// setTimeout is only to demo this after previous async functions
	async function f() {
	  	return "I didn't block you";
	}
	// receives the returned promise as a parameter 
	// for console.log in the .then() method
	f().then(console.log); 
	console.log("I'm not blocked!"); // appears before returned promise in console.log
}, 3000);
