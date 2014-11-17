//import libraries 
var path = require('path'); //path is used for convenient file system path functions
var express = require('express');  //express for MVC
var compression = require('compression');  //compression gzips the packets to make them smaller/faster on the network
var favicon = require('serve-favicon');  //serves the favicon
var cookieParser = require('cookie-parser'); //parses cookies from the user
var bodyParser = require('body-parser'); /**body-parser pulls out url paths, query parameters and post variables
                                         as usable variables in code.  
                                         You can reference them with req.body for POST variables or
                                         req.params for url/query parameters**/
var mongoose = require('mongoose'); //Mongoose is one of the most popular MongoDB libraries for node

//MONGODB address to connect to.
//process.env.MONGOHQ_URL is the variable automatically put into your node application by Heroku is you are using mongoHQ
//otherwise fallback to localhost. The string after mongodb://localhost is the database name. It can be anything you want. 
var dbURL = process.env.MONGOHQ_URL || "mongodb://localhost/simpleNodeMongoApp";

//call mongoose's connect function and pass in the url. If there are any errors connecting, we will throw it and kill the server. 
//Once connected, the mongoose package will stay connected for every file that requires it in this project
var db = mongoose.connect(dbURL, function(err) {
    if(err) {
        console.log("Could not connect to database");
        throw err;
    }
});

//pull in our routes
var router = require('./router.js'); 

var server;  
var port = process.env.PORT || process.env.NODE_PORT || 3000; 

var app = express(); 
//set up the static assets hosted to any web page
//Once a web page goes to the client, it can't reference any code on the server at all
//The only thing it can do is send HTTP requests like GET/POST or access static files
//in our client folder that we mapped to /assets.
app.use('/assets', express.static(path.resolve(__dirname+'../../client/'))); 
app.use(compression()); 
app.use(bodyParser.urlencoded({ //tell express to use the bodyParser with the urlencoded format
  extended: true                //The url encoded format allows it to pull variables from the query string
}));                            //or the POST body as req.params (for query string or URL) or req.body for POST
                                //The extended flag tells it to accept more rich media formats (non-standard)
                                //such as x-www-form-urlencoded. 
app.set('view engine', 'jade'); 
app.set('views', __dirname + '/views'); 
app.use(favicon(__dirname + '/../client/img/favicon.png')); 
app.use(cookieParser()); 

router(app); 

server = app.listen(port, function(err) { 
    if (err) {
      throw err;
    }
    console.log('Listening on port ' + port);
});
