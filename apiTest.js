let express = require('express');
let app = express();


var http = require('http');
let url_list = [
    'http://120.138.9.64:80/',
    'http://120.138.9.64:7000/'
];

for (let i = 0; i < url_list.length; i++) {
    console.log(" repeted");
    runn_all_application(url_list[i]);
}

function runn_all_application(redirect_Ui) {
    console.log(redirect_Ui)

    app.get('/', (req, res) => {
        console.log(redirect_Ui)
        res.redirect(redirect_Ui);
        res.end();
    }
    );
    
}

app.listen(3000)