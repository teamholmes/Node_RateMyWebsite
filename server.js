//http://fdietz.github.io/recipes-with-angular-js//consuming-external-services/consuming-restful-apis.html

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');




var mongoose = require('mongoose');
var reviewSchema = require('./public/javascripts/angular/models/mongooseSchema.js');
var dPacket = require('./public/javascripts/angular/models/dataPacket.js');
mongoose.connect('mongodb://localhost:27017/ratemywebsite');


// Start mongodb specific setup
/*var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/ratemywebsite');*/
// End mongodb specific setup


var routes = require('./routes/index');
var users = require('./routes/users');
//var api = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);


// routes ======================================================================


    // get all Reviews
    app.use('/api/Review', function(req, res) {
console.log("retrieveing list of websites");
        // use mongoose to get all todos in the database
        reviewSchema.find(function(err, reviews) {

        var dp = new dPacket;

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
            {
                dp.message = err;
                res.json(dp);
            }
            else
            {
                dp.success = true;
                dp.data = reviewSchema;
                res.json(dp); 
            }

        });
    });

    // create todo and send back all todos after creation
    app.post('/api/Review', function(req, res) {

        // create a todo, information comes from AJAX request from Angular
        console.log(">>>>>>>apr review called");
        Review.create({
            Name : req.body.Name,
            URL : req.body.Url,
            DateAdded : new Date()
        }, function(err, todo) {
        if (err)
            console.log("..... error " + err);
                res.send(err);

            // get and return all the todos after you create another
        var dp = new dPacket;;
        dp.success = true;
        dp.data = "hello";
        dp.message = "potatoe";
        res.json(dp);
        });

    });


    // delete a todo
    app.delete('/api/Review/:todo_id', function(req, res) {
        Review.remove({
            _id : req.params.todo_id
        }, function(err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Todo.find(function(err, todos) {
                if (err)
                    res.send(err)
                res.json(todos);
            });
        });
    });
    // routes ======================================================================





// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});




module.exports = app;
