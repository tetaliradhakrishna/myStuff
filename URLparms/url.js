const express = require('express')
const app = express();

app.get('/', (req, res) => res.send('Hello World!'));

var url = require('url');
var adr = 'http://localhost:8080/default.htm?year=2017&month=february';

app.listen(adr, () => console.log('Example app listening on port 3000!'))