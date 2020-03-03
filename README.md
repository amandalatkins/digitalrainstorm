# DigitalRainstorm.com

The portfolio site for my freelance business was previously running on a custom PHP/MySQL backend. In this repo, I've updated it to a NodeJS app using the following technologies:
* [NodeJS](https://nodejs.org)
* [Express](https://npmjs.com/package/express)
* [Express Handlebars](https://npmjs.com/package/express-handlebars)
* [MySQL](https://npmjs.com/package/mysql2)
* [Sequelize ORM](https://npmjs.com/package/sequelize)
* [Nodemailer](https://npmjs.com/package/nodemailer)

## View Online

You can currently [view the updated site on Heroku](https://digitalrainstorm.herokuapp.com/). It is soon to be deployed to its namesake URL.

## Screenshots

![Home](/public/img/readme/home.png)
![Portfolio](/public/img/readme/portfolio.png)

## Code Snippets

The following snippet shows the request route that pulls the portfolio projects from the database depending on the value of url parameter `:cat`.

```javascript
app.get('/portfolio/:cat', (req, res) => {
    db.Project.findAll({ 
        where: { 
            category: req.params.cat 
        }, 
        order: [['order','ASC']]
    })
    .then(appProjects => {
        formatProjects(appProjects, function(projects) {
            fetchAndFormatServices(function(services) {
                var data = {
                    projects: projects,
                    services: services
                }
                res.render('portfolio', data);
            });
        });
    });
});
```

This code snippet shows the configuration and use of `nodemailer`.

```javascript
const email = nodemailer.createTransport(emailCreds);

email.verify((err, success) => {
    if (err) return console.log(err);
    return console.log("Email config is successful");
});

module.exports = function(app) {

    app.post('/api/email', (req,res) => {

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
```

## Acknowledgements

Thanks to Jerome, Mahisha, and Kerwin for the challenge! Special thanks to Kerwin for the tips on running this Node app on my web hosting. (Stay tuned!)
