/**
 * To write the ES6 progrms and exicutions 
 * Install  node js 
 * Global install bable  sudo npm install -g babel-preset-es2015
 * Npm i -D create a directory in  our folder stracture 
 * JavaScript compiler and configurable transpiler used in web development
 * convert the browser understandbale js code 
 * to install and run the project in es6 https://github.com/ccoenraets/es6-tutorial
 * to run this https://ccoenraets.github.io/es6-tutorial/setup-babel/
 * 
 */


// Destructing assignment 
let full_name =['John','Deo'];
console.log([first_name,last_name]=full_name);


// Template literals es6 
let a="Hello";
let b="John";
let c=`${a} ${b}` ;
console.log(c); //outputs Hello John;

// es5
var e="Hello";
var f="John";
var g = e+ " " + f;
console.log(g); //outputs Hello John;

//Spread Operator  nothing but concatNation
let h =[7,8,9];
let i=[1,2,3,...h,10];
console.log(i); // [1,2,3,7,8,9,10]

// ... 3 dots is spred operator 
function print(...z){
	console.log(z); 
}

print(1,2,3,4);//[1,2,3,4]



// classess modal 
// best example https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
class Rectangle {
    // cunstrctor 
    //  every time calss call cunstrocyor also will call 
    constructor(height, width) {
      this.height = height;
      this.width = width;
    }

    // Getter
    get area() {
      return this.calcArea();
    }
    // Method
    calcArea() {
      return this.height * this.width;
    }
  }
  
  const square = new Rectangle(10, 10);
  console.log(square.area); // 100


/**
 * New Features in ES6.
 * across Generators, Observables and Spread operators

    Support for constants (also known as “immutable variables”)
    Block-Scope support for both variables, constants, functions
    Arrow Functions
    Extended Parameter Handling
    Template Literals
    Extended Literals
    Enhanced Regular Expression
    Enhanced Object Properties
    Destructuring Assignment
    Modules, Classes, Iterators, Generators
    Support for Map/Set & WeakMap/WeakSet
    Promises, Meta-Programming ,Internationalization & Localization
 */