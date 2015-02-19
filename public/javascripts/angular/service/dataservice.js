appModule.service('dataService',function($http)
{
	//var test = "10";

	var urlBase = 'http://localhost:27017/';

	this.connectionTest = function()
	{
		return "Connection successful";
	};

	this.getAllWebsites = function()
	{
		return "10";
		// return $http.get(urlBase);
	};
	
})