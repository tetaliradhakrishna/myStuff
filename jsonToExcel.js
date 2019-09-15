var json2xls = require('json2xls');
var jsonArr = [{
    foo: 'bar',
    qux: 'moo',
    poo: 123,
    stux: new Date()
},
{
    foo: 'bar',
    qux: 'moo',
    poo: 345,
    stux: new Date()
}];
let express = require('express');
let app = express();
app.use(json2xls.middleware);
app.get('/',function(req, res) {
    res.xls('data.xlsx', jsonArr);
});
app.listen(3000);