onlineAdsApp.controller('UserAdModalController',
    function userAdModalController($scope, $rootScope, $route, $modalInstance, adsData, id, action, errorsService) {
        $scope.id = id;
        $scope.action = action;

        /* get selected ad */
        adsData.getAdById(id).then(function(data) {
            $scope.currentAd = data;
        }, function(error) {
            errorsService.handleError(error);
            errorsService.handleError(error);
        });

        /* confirm CRUD operation on ad */
        $scope.ok = function() {
            $modalInstance.close();
            /* perform CRUD opration on ad depending on  requested action and id sent by the 
            $modal reslove functions */
            switch (action) {
                case 'Deactivate':
                    adsData.deactivateAd(id).then(function(data) {
                        $route.reload();
                        $rootScope.$broadcast('alertMessage', data.message + 
                            "It was moved into your Inactive Ads.");
                    }, function(error) {
                        errorsService.handleError(error);
                    });
                    break;
                case 'Delete':
                    adsData.deleteAd(id).then(function(data) {
                        $route.reload();
                        $rootScope.$broadcast('alertMessage', data.message);
                    }, function(error) {
                        errorsService.handleError(error);
                    });
                    break;
                case 'Publish again':
                    adsData.publishAgainAd(id).then(function(data) {
                        $route.reload();
                        $rootScope.$broadcast('alertMessage', data.message + 
                            "It was moved into your Waiting Approval Ads.");
                    }, function(error) {
                        errorsService.handleError(error);
                    });
                    break;
                default:
                    break;
            }
        };

        /* close modal dialog */
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    });