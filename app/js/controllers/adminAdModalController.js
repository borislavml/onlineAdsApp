onlineAdsApp.controller('AdminAdModalController',
    function adminAdModalController($scope, $rootScope, $route, $modalInstance, adsData, id, action, errorsService) {
        $scope.id = id;
        $scope.action = action;

        /* get selected ad */
        adsData.adminGetAdById(id).then(function(data) {
            $scope.currentAd = data;
        }, function(error) {
            errorsService.handleError(error);
        });

        /* confirm CRUD operation on ad */
        $scope.ok = function() {
            $modalInstance.close();
            /* perform CRUD opration on ad depending on  requested action and id sent by the 
            $modal reslove functions */
            switch (action) {
                case 'Approve':
                    adsData.adminApproveAd(id).then(function(data) {
                        $route.reload();
                        $rootScope.$broadcast('alertMessage', data.message + 
                            "It was moved into published ads.");
                    }, function(error) {
                        errorsService.handleError(error);
                    });
                    break;
                case 'Reject':
                    adsData.adminRejectAd(id).then(function(data) {
                        $route.reload();
                        $rootScope.$broadcast('alertMessage', data.message + 
                            "It was moved into rejected ads.");
                    }, function(error) {
                        errorsService.handleError(error);
                    });
                    break;
                case 'Delete':
                    adsData.adminDeleteAd(id).then(function(data) {
                        $route.reload();
                        $rootScope.$broadcast('alertMessage', data.message);
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