const db = require('../models');

module.exports = function(app) {

    app.get('/', (req, res) => {
        db.Project.findAll({ where: { isFeatured: true } }).then(featuredProjects => {
            db.Testimonial.findAll({where: { isFeatured: true }}).then(featuredTestimonials => {
                fetchAndFormatServices(function(formattedServices) {
                    formatProjects(featuredProjects, function(projects) {
                        formatTestimonials(featuredTestimonials, function(testimonials) {
                            var data = {
                                projects: projects,
                                testimonials: testimonials,
                                services: formattedServices
                            }
                            res.render('index', data);
                        });
                    });
                });
            });
        });
    });

    app.get('/portfolio/:cat', (req, res) => {
        db.Project.findAll({ where: { category: req.params.cat }, order: [['order','ASC']]})
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
        return callback(serv);
    });
}

function formatProjects(projects, callback) {
    var proj = [];
    projects.forEach(project => {
        proj.push({ project: {
            name: project.name,
            desc: project.desc,
            img: project.img,
            url: project.url,
            services: project.services,
            category: project.category
        } });
    });
    return callback(proj);
}

function formatTestimonials(testimonials, callback) {
    var test = [];
    testimonials.forEach(testimonial => {
        test.push({
            quote: testimonial.quote,
            person: testimonial.person,
            position: testimonial.position,
        });
    });
    return callback(test);
}