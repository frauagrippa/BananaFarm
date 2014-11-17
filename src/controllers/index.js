//Require the models folder. This will automatically load the index.js file
var models = require('../models');

//get the Banana model 
var Banana = models.Banana;


//Deals with the home page
module.exports.homePage = function(req, res) {
    return res.render('home');
};

//Dislaying the create stuff
module.exports.createPage = function(req, res) {

    return res.render('create');
};

//You have created your banana! Adds to database and displays info about creation. Receives the "create banana" post thing.
module.exports.createBanana = function(req, res) {
    
    var template = "submission";

    if(!req.body.name) {
        return res.render(template, {error: "Name is required!"});
    }
    if(!req.body.mood) {
        return res.render(template, {error: "Mood is required!"});
    }
    if(!req.body.color) {
        return res.render(template, {error: "Color is required!"});
    }
    if(!req.body.flavor) {
        return res.render(template, {error: "Flavor is required!"});
    }

    var data = {
        name: req.body.name,
        color: req.body.color,
        mood: req.body.mood,
        flavor: req.body.flavor
    };

    var newBanana = new models.Banana.BananaModel(data);

    newBanana.save(function(error) {
        if(error) {
            return res.render(template, {error: error});
        }

        return res.render(template, {name: data.name})

    });



};

//Deals with viewing the bananas
module.exports.viewBananas = function(req, res) {

    var template = "view";

    var callback = function(error, result) {
        if(error) {
            return res.render(template, {error: result});
        }

        if(result.length === 0) {
            return res.render(template, {empty: true});
        }

        return res.render(template, {results: result});
    };

    models.Banana.BananaModel.find(callback);

};























