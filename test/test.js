var expect = require('chai').expect;
var addTwoNumbers = require('./addTwonumbersTest.js');

describe('addTwoNumbers()', function () {
  it('should add two numbers', function () {
    
    // 1. ARRANGE
    var x = 1;
    var y = 2;
    var sum1 = x + y;
    console.log('sum1',sum1);

    // 2. ACT
    //var sum2 = addTwoNumbers(2, 2);  // test faild 
    var sum2 = addTwoNumbers(2, 1); // test passed
    console.log('sum2',sum2)

    // 3. ASSERT
    expect(sum2).to.be.equal(sum1);

  });
});