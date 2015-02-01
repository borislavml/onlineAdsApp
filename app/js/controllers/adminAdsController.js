/* Controllers */
var onlineAdsAppControllers = onlineAdsAppControllers || angular.module('onlineAdsAppControllers', []);

onlineAdsAppControllers.controller('AdminAdsController',
    function adminAdsController($scope, $rootScope, $location, $modal, adsData, categoriesData, townsData, 
        errorsService, adsPerPageAdmin) {
        $scope.loading = true;
        $scope.noAdsToDisplay = false;
        $scope.totalAdsCount;
        
        /* get ads status for filtering from route */
        var adStatus,
            path = $location.path();
        if (path === '/admin/home') {
            adStatus = ''
        } else {
            adStatus = $location.path().substr(11, $location.path().length);
        }


        /* filter buttons values*/
        $scope.townFilter = "Town";
        $scope.categoryFilter = "Category";

        /* get selected town/category id for further filtering */
        var currentCategoryId = '',
            currentTownId = '',
            currentPage = 1;

        /* pagination */
        $scope.totalAds = 0;
        $scope.adsPerPage = parseInt(adsPerPageAdmin);
        getResultsPage(1);

        $scope.pagination = {
            current: 1
        };

        $scope.pageChanged = function(newPage) {
            getResultsPage(newPage);
        };

        function getResultsPage(pageNumber) {
            adsData.adminGetAllFiltered(pageNumber, currentTownId, currentCategoryId, adStatus, $scope.adsPerPage)
            .then(function(data) {
                $scope.noAdsToDisplay = false;
                $scope.loading = true;
                $scope.adsData = data;

                if (data.ads.length === 0) {
                    $scope.noAdsToDisplay = true;
                }

                $scope.totalAds = parseInt(data.numPages) * $scope.adsPerPage;
                $scope.totalAdsCount = data.numItems;
                currentPage = pageNumber;
            }, function(error) {
                errorsService.handleError(error);
            }).finally(function() {
                $scope.loading = false;
                $('html, body').animate({
                    scrollTop: 0
                }, 1000);
            });
        }

        /* get all categoreis */
        categoriesData.getAll().then(function(data) {
            $scope.categoriesData = data;
        }, function(error) {
            errorsService.handleError(error);
        });

        /* filter ads by category */
        $scope.filterByCategory = function(categoryId, cateogryName) {
            adsData.adminGetAllFiltered(currentPage, currentTownId, categoryId, adStatus, $scope.adsPerPage)
            .then(function(data) {
                $scope.noAdsToDisplay = false;
                $scope.loading = true;
                $scope.adsData = data;

                if (data.ads.length === 0) {
                    $scope.noAdsToDisplay = true;
                }

                $scope.totalAds = parseInt(data.numPages) * $scope.adsPerPage;
                $scope.categoryFilter = cateogryName;
                currentCategoryId = categoryId;
            }, function(error) {
                errorsService.handleError(error);
            }).finally(function() {
                $scope.loading = false;
            });
        };

        /* get all towns*/
        townsData.getAll().then(function(data) {
            $scope.townsData = data;
        }, function(error) {
            errorsService.handleError(error);
        });

        /* filter ads by town*/
        $scope.filterByTown = function(townId, townName) {
            adsData.adminGetAllFiltered(currentPage, townId, currentCategoryId, adStatus, $scope.adsPerPage)
            .then(function(data) {
                $scope.noAdsToDisplay = false;
                $scope.loading = true;
                $scope.adsData = data;

                if (data.ads.length === 0) {
                    $scope.noAdsToDisplay = true;
                }

                $scope.totalAds = parseInt(data.numPages) * $scope.adsPerPage;
                $scope.townFilter = townName;
                currentTownId = townId;
            }, function(error) {
                errorsService.handleError(error);
            }).finally(function() {
                $scope.loading = false;
            });
        };

        $scope.filterByCount = function(count) {
            var adsPerPage = parseInt(count);
            adsData.adminGetAllFiltered(currentPage, currentTownId, currentCategoryId, adStatus, adsPerPage)
            .then(function(data) {
                $scope.noAdsToDisplay = false;
                $scope.loading = true;
                $scope.adsData = data;

                if (data.ads.length === 0) {
                    $scope.noAdsToDisplay = true;
                }

                $scope.totalAds = parseInt(data.numPages) * adsPerPage;
                $scope.adsPerPage = adsPerPage;
            }, function(error) {
                errorsService.handleError(error);
            }).finally(function() {
                $scope.loading = false;
                $('html, body').animate({
                    scrollTop: 0
                }, 1000);
            });
        };

         /* open a modal dialog to ask admin for confirmation of action
         -requests are executed in the modal controler */
        $scope.adminOpenModal = function(id, action) {
            var modalInstance = $modal.open({
                templateUrl: './templates/AdminModalTemplate.html',
                controller: 'AdminModalController',
                backdrop: false,
                keyboard: false,
                resolve: {
                    id: function() {
                        return id;
                    },
                    action: function() {
                        return action;
                    }
                }
            });
        };

        /* open a modal dialog for admin to edit ad;
         -request is executed in the adminEditAdModal controler */
        $scope.adminOpenEditModal = function(id) {
            var modalInstance = $modal.open({
                templateUrl: './templates/adminEditAdModalTemplate.html',
                controller: 'AdminEditAdModalController',
                backdrop: false,
                keyboard: false,
                resolve: {
                    id: function() {
                        return id;
                    }
                }
            });
        };
    });