onlineAdsApp.controller('ModalController',
    function modalController($scope, $modalInstance, adsData, id, action) {
        $scope.id = id;
        $scope.action = action;

        adsData.getAdById(id).then(function(data) {
            $scope.currentAd = data;
        }, function(error) {});

        $scope.ok = function() {
            $modalInstance.close();

            switch (action) {
                case 'Deactivate':
                    adsData.deactivateAd(id).then(function(data) {
                        $("li").remove("#" + id);
                    }, function(error) {});
                    break;
                case 'Delete':
                    adsData.deleteAd(id).then(function(data) {
                        $("li").remove("#" + id);
                    }, function(error) {});
                    break;
                case 'Publish again':
                    adsData.publishAgainAd(id).then(function(data) {
                        $("li").remove("#" + id);
                    }, function(error) {});
                    break;
                default:
                    break;
            }
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    });