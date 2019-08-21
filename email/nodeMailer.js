var mailer = require('nodemailer');
var fs = require('fs');
mailer.SMTP = {
    host: 'gmail', 
    port:587,
    use_authentication: true, 
    user: '', 
    pass: ''
};


fs.readFile("./attachment.txt", function (err, data) {

    mailer.send_mail({       
        sender: 'radha784578@gmail.com',
        to: 'tetaliradhakrishna@gmail.com',
        subject: 'Attachment!',
        body: 'mail content...',
        attachments: [{'filename': 'attachment.txt', 'content': data}]
    }), function(err, success) {
        if (err) {
            // Handle error
        }

    }
});