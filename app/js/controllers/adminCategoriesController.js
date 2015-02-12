var onlineAdsAppControllers = onlineAdsAppControllers || angular.module('onlineAdsAppControllers', []);

onlineAdsAppControllers.controller('AdminCategoriesController',
    function adminCategoriesController($scope, $rootScope, $modal, authorizationService, categoriesData, 
        errorsService, categoriesPerPageAdmin) {
        /* pagination */
        var currentPage;

        $scope.totalCategorires = 0;
        $scope.categoriesPerPage = parseInt(categoriesPerPageAdmin);
        getResultsPage(1);

        $scope.pagination = {
            current: 1
        };

        $scope.pageChanged = function(newPage) {
            getResultsPage(newPage);
        };

        function getResultsPage(pageNumber) {
            categoriesData.adminGetAll(pageNumber, $scope.categoriesPerPage).then(function(data) {
                $scope.noCategoriesToDisplay = false;
                $scope.loading = true;
                $scope.categoriesData = data;

                if (data.categories.length === 0) {
                    $scope.noCategoriesToDisplay = true;
                }

                $scope.totalCategorires = data.numPages * $scope.categoriesPerPage;
                $scope.totaCategoriesCount = data.numItems;
                currentPage = pageNumber;
            }, function(error) {
                errorsService.handleError(error);
            }).finally(function() {
                $scope.loading = false;
                $('html, body').animate({
                    scrollTop: 0
                }, 1000);
            });
        };

        $scope.filterByCount = function (count) {
            var categoriesPerPage = parseInt(count);

            categoriesData.adminGetAll(currentPage, categoriesPerPage).then(function(data) {
                $scope.noCategoriesToDisplay = false;
                $scope.loading = true;
                $scope.categoriesData = data;

                if (data.categories.length === 0) {
                    $scope.noCategoriesToDisplay = true;
                }

                $scope.totalCategorires = data.numPages * $scope.categoriesPerPage;
                $scope.totaCategoriesCount = data.numItems;
                $scope.categoriesPerPage = categoriesPerPage;
            }, function(error) {
                errorsService.handleError(error);
            }).finally(function() {
                $scope.loading = false;
                $('html, body').animate({
                    scrollTop: 0
                }, 1000);
            });
        };

        /* open a modal dialog to ask admin for new category
         -requests are executed in the AdminAddCategoryModalControler */
        $scope.addCategory = function() {
            var modalInstance = $modal.open({
                templateUrl: './templates/admin-add-category-modal-template.html',
                controller: 'AdminAddCategoryModalController',
                backdrop: false,
                keyboard: false
            });
        };

        /* open a modal dialog to ask admin for confirming deleting category
         -requests are executed in the AdminDeleteCategoryModalControler */
        $scope.deleteCategory = function(categoryName, categoryID) {
            var modalInstance = $modal.open({
                templateUrl: './templates/admin-delete-category-modal-template.html',
                controller: 'AdminDeleteCategoryModalController',
                backdrop: false,
                keyboard: false,
                resolve: {
                     categoryID: function() {
                        return categoryID;
                    },
                    categoryName: function() {
                        return categoryName;
                    },
                }
            });
        };

        /* open a modal dialog for admin to edit current category
         -requests are executed in the AdminEditCategoryModalControler */
        $scope.editCategory = function(categoryName, categoryID) {
            var modalInstance = $modal.open({
                templateUrl: './templates/admin-edit-category-modal-template.html',
                controller: 'AdminEditCategoryModalController',
                backdrop: false,
                keyboard: false,
                resolve: {
                     categoryID: function() {
                        return categoryID;
                    },
                    categoryName: function() {
                        return categoryName;
                    },
                }
            });
        };
    });