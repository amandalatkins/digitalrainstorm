const db = require('../models');

module.exports = function(app) {

    app.get('/', (req, res) => {
        db.Project.findAll({ where: { isFeatured: true } }).then(featuredProjects => {
            db.Testimonial.findAll({where: { isFeatured: true }}).then(featuredTestimonials => {
                fetchAndFormatServices(function(formattedServices) {

                    var data = {
                        projects: [],
                        testimonials: [],
                        services: formattedServices
                    }
                    // Format Other Sequelize results for Handlebars
                    featuredTestimonials.forEach(testimonial => {
                        data.testimonials.push({
                            quote: testimonial.quote,
                            person: testimonial.person,
                            position: testimonial.position,
                        });
                    });

                    featuredProjects.forEach(project => {
                        data.projects.push({
                            name: project.name,
                            desc: project.desc,
                            img: project.img,
                            url: project.url,
                            services: project.services,
                            category: project.category
                        });
                    });

                    console.log(data);

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
        fetchAndFormatServices(function(services) {
            var serv = {
                services: services
            }
            res.render('about', serv);
        });
        
    });

}

function fetchAndFormatServices(callback) {
    db.Service.findAll({ attributes: ['service']}).then(services => {
        var serv = [];
        services.forEach(service => {
            serv.push({
                service: service.service
            });
        });
        callback(serv);
        return;
    });
}