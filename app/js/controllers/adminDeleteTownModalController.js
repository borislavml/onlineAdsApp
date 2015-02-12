onlineAdsApp.controller('AdminDeleteTownModalController',
    function adminDeleteTownModalController($scope, $rootScope, $route, $modalInstance, townID,
     townName, townsData, errorsService) {
        $scope.townID = townID;
        $scope.townName = townName;

        /* confirm category deletion */
        $scope.ok = function() {
            $modalInstance.close();

            townsData.adminDeleteTown($scope.townID).then(function(data) {
                $route.reload();
                $rootScope.$broadcast('alertMessage', data.message);
            }, function(error) {
                errorsService.handleError(error);
            });
        };

        /* close modal dialog */
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    });