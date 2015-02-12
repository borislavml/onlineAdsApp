onlineAdsApp.controller('AdminDeleteCategoryModalController',
    function adminDeleteCategoryModalController($scope, $rootScope, $route, $modalInstance, categoryID,
     categoryName, categoriesData, errorsService) {
        $scope.categoryID = categoryID;
        $scope.categoryName = categoryName;

        /* confirm category deletion */
        $scope.ok = function() {
            $modalInstance.close();

            categoriesData.deleteCategory($scope.categoryID).then(function(data) {
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