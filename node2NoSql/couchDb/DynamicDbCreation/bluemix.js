// Load the Cloudant library.
var Cloudant = require('cloudant');
 
var me = 'info@whiznext.com'; // Set this to your own account
var password ='srik12th';
 
// Initialize the library with my account.
var cloudant = Cloudant({account:me, password:password});
 
cloudant.db.list(function(err, allDbs) {
  console.log('All my databases: %s', allDbs.join(', '))
});