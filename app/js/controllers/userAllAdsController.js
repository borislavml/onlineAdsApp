var onlineAdsAppControllers = onlineAdsAppControllers || angular.module('onlineAdsAppControllers', []);

onlineAdsAppControllers.controller('UserAllAdsController',
    function userAllAdsController($scope, $rootScope, $location, adsData) {
        var ajaxErrorText = 'Something went wrong, please try again or refresh the page.',
            adStatus = $location.path().substr(10, $location.path().length);

        $scope.noAdsToDisplay = false;
        $scope.errorOccurred = false;
        $scope.alertMsg = '';

        $scope.closeAlert = function() {
            $scope.errorOccurred = false;
        };

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
            adsData.getUserAds(pageNumber, adStatus).then(function(data) {
                if (data.ads.length === 0) {
                    $scope.noAdsToDisplay = true;
                } else {
                    $scope.userAdsData = data;
                    $scope.totalAds = parseInt(data.numItems);
                    currentPage = pageNumber;
                }
            }, function(error) {
                $scope.errorOccurred = true;
                $scope.alertMsg = ajaxErrorText;
            });
        }

    });