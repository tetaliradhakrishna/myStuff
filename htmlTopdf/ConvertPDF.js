var fs = require('fs');
var pdf = require('html-pdf');
var html = fs.readFileSync('businesscard.html', 'utf8');
console.log(html);
var options = { format: 'Letter', "height": "15.5in",        // allowed units: mm, cm, in, px
"width": "20in"};
 
pdf.create(html, options).toFile('./businesscard.pdf', function(err, res) {
  if (err) return console.log(err);
  console.log(res); // { filename: '/app/businesscard.pdf' }
});