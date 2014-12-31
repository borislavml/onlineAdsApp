var onlineAdsAppControllers = onlineAdsAppControllers || angular.module('onlineAdsAppControllers', []);

onlineAdsAppControllers.controller('UserAllAdsController',
    function userAllAdsController($scope, adsData) {

        adsData.getAllUserAds().then(function(data) {
            $scope.userAdsData = data;
        }, function(error) {
            console.log(error);
        });

    });