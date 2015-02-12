onlineAdsApp.controller('AdminEditTownModalController',
    function adminEditTownModalController($scope, $rootScope, $route, $modalInstance, townID,
     townName, townsData, errorsService) {
        $scope.townID = townID;
        $scope.townName = townName;

        /* confirm category deletion */
        $scope.ok = function(editCategoryForm) {
            $modalInstance.close();

            if (!$scope.townName) {
                $rootScope.$broadcast('alertMessage', "Town name can not be empty!");
                return;
            };

            newTownName = {
                name: $scope.townName,
            }

            townsData.adminEditTown($scope.townID, newTownName).then(function(data) {
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