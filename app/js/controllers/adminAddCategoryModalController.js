onlineAdsApp.controller('AdminAddCategoryModalController',
    function adminAddCategoryModalController($scope, $rootScope, $route, $modalInstance, categoriesData, errorsService) {

        /* admin ad category */
        $scope.ok = function() {
            $modalInstance.close();

            if (!$scope.categoryName) {
                $rootScope.$broadcast('alertMessage', "Category name can not be empty!");
                return;
            };

            newCategory = {
                name: $scope.categoryName,
            }

            categoriesData.addCategory(newCategory).then(function(data) {
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