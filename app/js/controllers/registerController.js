var onlineAdsAppControllers = onlineAdsAppControllers || angular.module('onlineAdsAppControllers', []);

onlineAdsAppControllers.controller('RegisterController',
    function registerController($scope, $http, adsData, categoriesData, townsData) {
        /* get all towns*/
        townsData.getAll().then(function(data) {
            $scope.townsData = data;
        }, function(error) {
            console.log(status, error);
        });
    });