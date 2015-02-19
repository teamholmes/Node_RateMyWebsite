


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


        $http({
            method: 'POST',
            url: '/api/Public',
            data: newReview
        })
                .success(function (data, status, headers, config) {

                    if (data.Success == true)
                    {
                        $scope.reviewWebsites.push(data.ResultData);
                    }

                    $scope.isLoading = false;
                    $scope.statusText = data.Message;
                    resetAddReviewFrom();
                })
                .error(function (data, status, headers, config) {
                    $scope.statusText = errorrTextDefault + " " + status + " " + data;
                    $scope.isLoading = false;
                });




    };



    $scope.loadJson = function () {
        $scope.statusText = "Please wait while the data loads..."
        $scope.isLoading = true;
        $scope.reviewWebsites = {};

        //var deferred = $q.defer();
        $scope.reviewWebsites = dataService.getAllWebsites();
        console.log("----->" + $scope.reviewWebsites);

        /*$http.get('/api/public/', {
            params: {}

        })
                .success(function (data, status, headers, config) {
                    if (data.Success == true) {
                        $scope.reviewWebsites = data.ResultData;
                    }
                    $scope.isLoading = false;
                    $scope.statusText = data.Message;
                })
                .error(function (data, status, headers, config) {
                    $scope.statusText = errorrTextDefault + " " + status + " " + data;
                    $scope.isLoading = false;
                });*/

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