


appModule.controller('websiteListController', ['$scope', '$http', '$q', 'dataService', function ($scope, $http, q, dataService) {

    var connectionWelcomeText = "If you can see this message then Angular framework is connected";

    var errorrTextDefault = "Error ";

    var newReview = {};


    function resetAddReviewFrom() {
        newReview = {};
        $scope.form = newReview;
    }


    $scope.init = function () {

        $scope.statusText =  connectionWelcomeText;
        $scope.currentDateTime = new Date();
        resetAddReviewFrom();
        $scope.isLoading = false;
        $scope.loadJson();
        $scope.reviewWebsites = {};

    };


    $scope.selectItem = function (item) {
        $scope.statusText = item.Name;
    };

        $scope.addReview = function (form) {
        newReview = $scope.form;
  
     $scope.statusText = "Please wait while the data is saved...";
            $scope.isLoading = true;
            
         var serviceresponse = dataService.addWebsite($http, $scope, newReview);

        /*$http({
            method: 'POST',
            url: '/api/Review/',
            data: newReview
        })
                .success(function (data, status, headers, config) {
                    console.log("successdata");
                   
                })
                .error(function (data, status, headers, config) {
                    console.log("fail data");
                    $scope.statusText = errorrTextDefault + " " + status + " " + data;
                    $scope.isLoading = false;
                });*/




    };



    $scope.loadJson = function () {
        $scope.statusText = "Please wait while the data loads..."
        $scope.isLoading = true;
        $scope.reviewWebsites = {};
        

         $scope.isLoading = false;

         var serviceresponse = dataService.getAllWebsites($http, $scope);

         resetAddReviewFrom();

    
    };

    $scope.init();

}]);

appModule.directive('websitelist', function () {
    return {
        templateUrl: '/javascripts/angular/View/websitelist.html'
    };
});

appModule.directive('addreview', function () {
    return {
        templateUrl: '/javascripts/angular/View/AddReview.html'
    };
});