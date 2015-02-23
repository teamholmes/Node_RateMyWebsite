//http://mongoosejs.com/docs/index.html

var dataPacket = function() {
	this.success = false;
	this.message = "";
	this.data = "";
}


appModule.service('dbRepository',function()
{

//var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017');

//var db = mongoose.connection;

});


appModule.service('dataService',  ['dbRepository',function(dbRepository)
{

	this.getAllWebsites = function(httpsource, scope)
	{
		httpsource.get('/api/Review/', {
            params: {}

        })
                .success(function (data, status, headers, config) {
                    if (data.success == true) {
                    
						scope.reviewWebsites = data.data;
                    	scope.statusText = "wesites loaded";
                    }
                   
                })
                .error(function (data, status, headers, config) {

                	scope.statusText = "failed to load websites";
                    scope.reviewWebsites = {};
                });

	};


	this.testDBConnection = function()
	{
		console.log("accessing testconnection function ");
		db.on('error', console.error.bind(console, 'connection error:'));
		db.once('open', function (callback) {
  			console.log("Database connection succesful");
		});
	};


	this.addWebsite = function(http, scope, wesitetoadd)
	{

		scope.isLoading = true;

		if (!this.isWebsiteFormValid(wesitetoadd)) 
		{
			scope.statusText = "You must complete all parts of the form.";
		}
		else
		{
		http({
            method: 'POST',
            url: '/api/Review/',
            data: wesitetoadd
        })
                .success(function (data, status, headers, config) {
                	scope.statusText = "I should be sticking this in MongoDB now";
                	//scope.reviewWebsite = 
                   
                })
                .error(function (data, status, headers, config) {
                    console.log("fail data");
                    scope.statusText = errorrTextDefault + " " + status + " " + data;
                });
			
		}
	};

	this.isWebsiteFormValid = function(website)
	{
		if (!website.Name || !website.Url) return false;
		return true;
	};
	
}]);


