const db = require('../models');

module.exports = function(app) {

    app.get('/', (req, res) => {
        db.Project.findAll({ where: { isFeatured: true }}).then(featuredProjects => {
            db.Testimonial.findAll({where: { isFeatured: true }}).then(featuredTestimonial => {
                db.Service.findAll({}).then(services => {

                    var data = {
                        projects: featuredProjects,
                        testimonials: featuredTestimonials,
                        services: services
                    }
    
                    res.render('index', data);

                });
            });
        });
    });

    app.get('/portfolio/web', (req, res) => {
        db.Project.findAll({ where: { category: "web" }}).then(webProjects => {
            var projects = {
                projects: webProjects
            }
            
            res.render('portfolio', projects);
        });
    });

    app.get('/portfolio/apps', (req,res) => {
        db.Project.findAll({ where: { category: "app" }}).then(appProjects => {
            var projects = {
                projects: appProjects
            }
            
            res.render('portfolio', projects);
        });
    });

    app.get('/portfolio', (req,res) => {
        res.redirect('/portfolio/web');
    });

    app.get('/about', (req,res) => {
        res.render('about');
    });

}