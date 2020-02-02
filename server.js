const express = require('express');
const handlebars = require('handlebars');
const mongo = require('mongojs');

const app = express();
const PORT = process.env.PORT | 3000;
 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

require("./app/routes/apiRoutes.js")(app);
require("./app/routes/htmlRoutes.js")(app);

const db = require("./app/models");

db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
      console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
    });
});