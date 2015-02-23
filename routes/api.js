/*

// routes ======================================================================


    // get all todos
    app.use('/api/Review', function(req, res) {

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
        Review.create({
            text : req.body.text,
            done : false
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

    module.exports = app;*/