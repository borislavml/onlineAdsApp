onlineAdsApp.controller('AdminAddTownModalController',
    function adminAddTownModalController($scope, $rootScope, $route, $modalInstance, townsData, errorsService) {

        /* admin ad towns */
        $scope.ok = function() {
            $modalInstance.close();

            if (!$scope.townName) {
                $rootScope.$broadcast('alertMessage', "Town name can not be empty!");
                return;
            };

            newTown = {
                name: $scope.townName,
            }

            townsData.adminAddTown(newTown).then(function(data) {
                $route.reload();
                $rootScope.$broadcast('alertMessage', data.message);
            }, function(error) {
                errorsService.handleError(error);
            })
        };

        /* close modal dialog */
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    });