const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'vermavineet688@gmail.com',
        pass: 'nvrc reyx ukic rqzi'
    }
});


const sendMail = (to, subject, text) => {
    const mailOptions = {
        from: "vermavineet688@gmail.com",
        to: to,
        subject: subject,
        text: text
    };

    transport.sendMail(mailOptions, (error, info) => {
        if(error) {
            console.log(error, "error in sending the mail");
        }
        else {
            console.log("mail sent successfully to the user");
        }
    });
};

module.exports = sendMail;