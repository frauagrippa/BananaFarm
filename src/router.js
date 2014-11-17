//import the controller folder (automatically calls the index.js file)
var controllers = require('./controllers'); 

//router function to set up the URL routes for an Express MVC app
var router = function(app) {

    app.get("/", controllers.homePage);

    app.get("/create", controllers.createPage);
    app.post("/create", controllers.createBanana);

    app.get("/view", controllers.viewBananas)

};

module.exports = router;