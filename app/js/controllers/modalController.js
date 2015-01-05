onlineAdsApp.controller('ModalController',
    function modalController($scope, $rootScope, $modalInstance, adsData, id, action, ajaxErrorText) {
        $scope.id = id;
        $scope.action = action;

        /* get selected ad */
        adsData.getAdById(id).then(function(data) {
            $scope.currentAd = data;
        }, function(error) {
            $rootScope.$broadcast('operatonError', ajaxErrorText);
        });

        /* confirm CRUD operation on ad */
        $scope.ok = function() {
            $modalInstance.close();
            /* perform CRUD opration on ad depending on  requested action and id sent by the 
            $modal reslove functions */
            switch (action) {
                case 'Deactivate':
                    adsData.deactivateAd(id).then(function(data) {
                        $rootScope.$broadcast('operatonSuccessfull', data.message + 
                            "It was moved into your Inactive Ads.");
                        $("#" + id).fadeTo(1000, 0).slideUp(700, function() {
                            $(this).remove("#" + id);
                        });
                    }, function(error) {
                        $rootScope.$broadcast('operatonError', ajaxErrorText);
                    });
                    break;
                case 'Delete':
                    adsData.deleteAd(id).then(function(data) {
                        $rootScope.$broadcast('operatonSuccessfull', data.message);
                        $("#" + id).fadeTo(1000, 0).slideUp(700, function() {
                            $(this).remove("#" + id);
                        });
                    }, function(error) {
                        $rootScope.$broadcast('operatonError', ajaxErrorText);
                    });
                    break;
                case 'Publish again':
                    adsData.publishAgainAd(id).then(function(data) {
                        $rootScope.$broadcast('operatonSuccessfull', data.message + 
                            "It was moved into your Waiting Approval Ads.");
                        $("#" + id).fadeTo(1000, 0).slideUp(700, function() {
                            $(this).remove("#" + id);
                        });
                    }, function(error) {
                        $rootScope.$broadcast('operatonError', ajaxErrorText);
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