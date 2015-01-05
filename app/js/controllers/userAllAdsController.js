var onlineAdsAppControllers = onlineAdsAppControllers || angular.module('onlineAdsAppControllers', []);

onlineAdsAppControllers.controller('UserAllAdsController',
    function userAllAdsController($scope, $rootScope, $location, $modal, $timeout, adsData, ajaxErrorText) {
        $scope.loading = true;
        var adStatus = $location.path().substr(10, $location.path().length);
        $scope.noAdsToDisplay = false;

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
                    $scope.loading = true;
                    $scope.userAdsData = data;
                    $scope.totalAds = parseInt(data.numItems);
                    currentPage = pageNumber;
                }
            }, function(error) {
                $rootScope.$broadcast('operatonError', ajaxErrorText);
            }).finally(function(){
                $scope.loading = false;
            });
        }

        /* open a modal dialog to ask user for confirmation of action
         -requests are executed in the modal controler */
        $scope.openModal = function(id, action) {
            var modalInstance = $modal.open({
                templateUrl: './templates/modalTemplate.html',
                controller: 'ModalController',
                backdrop: false,
                keyboard: false,
                resolve: {
                    id: function() {
                        return id;
                    },
                    action: function() {
                        return action;
                    }
                }
            });
        };

        /* open a modal dialog to ask user for confirmation of action
         -request is executed in the EditAdModal controler */
        $scope.openEditModal = function(id) {
            var modalInstance = $modal.open({
                templateUrl: './templates/editAdModalTemplate.html',
                controller: 'EditAdModalController',
                backdrop: false,
                keyboard: false,
                resolve: {
                    id: function() {
                        return id;
                    }
                }
            });
        };
    });