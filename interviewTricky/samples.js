console.log(2 + '2');
console.log(2 - '2');

// remove the duplicates with loop and dont use any other  loopings 
// for this  js come up with set()  this wont allow the duplicates in the array 

 let number  = [1,2,2,3];
  console.log(new Set(number))
 //  " ... is the "spread operation to convet that in to array
  console.log([...new Set(number)]) 

  // dont add any properties to the object 
  //Object.freeze("passthe object it wont allow to add more")
  // with out instaert new propertie chane that properity object.seal( "pass the object ")