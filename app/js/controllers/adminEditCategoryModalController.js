onlineAdsApp.controller('AdminEditCategoryModalController',
    function adminEditCategoryModalController($scope, $rootScope, $route, $modalInstance, categoryID,
     categoryName, categoriesData, errorsService) {
        $scope.categoryID = categoryID;
        $scope.categoryName = categoryName;

        /* confirm category deletion */
        $scope.ok = function(editCategoryForm) {
            $modalInstance.close();

            if (!$scope.categoryName) {
                $rootScope.$broadcast('alertMessage', "Category name can not be empty!");
                return;
            };

            newCategory = {
                name: $scope.categoryName,
            }

            categoriesData.editCategory($scope.categoryID, newCategory).then(function(data) {
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