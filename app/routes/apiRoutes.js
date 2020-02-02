const nodemailer = require("nodemailer");

const email = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 587,
    secure: false,
    auth: {
        user: "4f8caed21ac95f",
        pass: "441641079fad6b"
    }
});

email.verify((err, success) => {
    if (err) return console.log(err);
    return console.log("Email config is successful");
});

module.exports = function(app) {

    app.post('/api/email', (req,res) => {
        // Send email

        var emailBody = `<html><body><p style='font-size:20px'><strong>${req.body.name}</strong> says:</p><p style='font-size:15px'>${req.body.message}</p><br><br><p>Email: ${req.body.email}</p><p>Phone: ${req.body.phone}</p><p>Site: ${req.body.website}</p></body></html>`

        var emailDeets = {
            from: `"${req.body.name}" <${req.body.email}>`,
            to: req.body.to,
            subject: "Message from DigitalRainstorm.com",
            html: emailBody
        }

        email.sendMail(emailDeets)
        .then(success => {
            res.status(200).end();
        })
        .catch(error => {
            res.status(400).end();
        });

    });

}