var onlineAdsAppControllers = onlineAdsAppControllers || angular.module('onlineAdsAppControllers', []);

onlineAdsAppControllers.controller('UserAllAdsController',
    function userAllAdsController($scope, adsData) {

        /* pagination */
        var currentPage = 1;
        $scope.totalAds = 0;
        $scope.adsPerPage = 3;
        getResultsPage(1);

        $scope.pagination = {
            current: 1
        };

        $scope.pageChanged = function(newPage) {
            getResultsPage(newPage);
        };

        function getResultsPage(pageNumber) {
            adsData.getAllUserAds(pageNumber).then(function(data) {
                $scope.userAdsData = data;
                $scope.totalAds = parseInt(data.numItems);
                currentPage = pageNumber;
            }, function(error) {
            	// TODO proper user message
                console.log(error);
            });
        }



    });