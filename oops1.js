
// this is fucntion 

function Person(gender) {
   
  this.gender = gender;
  console.log('Person instantiated');
}

var person1 = new Person('Male');
var person2 = new Person('Female');

//display the person1 gender
console.log('person1 is a ' + JSON.stringify( person1)); // person1 is a Male