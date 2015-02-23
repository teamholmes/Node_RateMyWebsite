var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server;
var db;
var devMode;

exports.DBSetup = function(table, dbPort, dbHost, devMode) {

    table = (table == undefined) ? 'datastore' : table;
    dbPort = (dbPort == undefined) ? 27017 : dbPost;
    dbHost = (dbHost == undefined) ? 'localhost' : dbHost;
    devMode = (devMode == undefined) ? false : devMode;
    server = new Server(dbHost, dbPort, {
        auto_reconnect: true
    });

    db = new Db(table, server, {
        safe: true
    });

    db.open(function(err, db) {

        if (!err) {
            db.collection('data', {
                strict: true
            }, function(err, collection) {
                if (err) {
                    if (devMode) {
                        console.log("The 'data' collection doesn't exist. Creating it with sample data...");
                        populateDB();
                    }
                }
            });
        }

    });
};

exports.findById = function(req, res) {

    var id = req.params.id;
    console.log('Retieving data item: ' + id);
    db.collection('data', function(err, collection) {
        collection.findOne({
            '_id': new BSON.ObjectID(id)
        }, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('data', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addData = function(req, res) {
    var itemToAdd = req.body;
    db.collection('data', function(err, collection) {
        collection.insert(itemToAdd, {
            safe: true
        }, function(err, result) {
            if (err) {
                res.send({
                    'error': 'An error has occurred'
                });
            } else {
                if (devMode) {
                    console.log('Success: ' + JSON.stringify(result[0]));
                }
                res.send(result[0]);
            }
        });
    });
};

exports.updateData = function(req, res) {
    var id = req.params.id;
    var data = req.body;
    console.log('Updating data: ' + id);
    console.log(JSON.stringify(data));
    db.collection('data', function(err, collection) {
        collection.update({
            '_id': new BSON.ObjectID(id)
        }, data, {
            safe: true
        }, function(err, result) {
            if (err) {
                console.log('Error updating data: ' + err);
                res.send({
                    'error': 'An error has occurred'
                });
            } else {
                if (devMode) {
                    console.log('' + result + ' document(s) updated');
                }
                res.send(data);
            }
        });
    });

};

exports.deleteData = function(req, res) {
    var id = req.params.id;
    if (devMode) {
        console.log('Deleting data: ' + id);
    }
    db.collection('data', function(err, collection) {
        collection.remove({
            '_id': new BSON.ObjectID(id)
        }, {
            safe: true
        }, function(err, result) {
            if (err) {
                res.send({
                    'error': 'An error has occurred - ' + err
                });
            } else {
                if (devMode) {
                    console.log('' + result + ' document(s) deleted');
                }
                res.send(req.body);
            }
        });
    });

};


var populateDB = function() { 
    var items = [{
        Key: "item1",
        Value: "1"
    }, {

        Key: "item2",
        Value: "2"
    }]; 

    db.collection('data', function(err, collection) {
        collection.insert(items, {
            safe: true
        }, function(err, result) {
            console.log(err);
        });
    });
};