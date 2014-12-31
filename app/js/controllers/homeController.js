/* Controllers */
var onlineAdsAppControllers = angular.module('onlineAdsAppControllers', []);

onlineAdsAppControllers.controller('HomeController',
    function homeController($scope, $http, adsData, categoriesData, townsData) {
        $scope.townFilter = "Town";
        $scope.categoryFilter = "Category";

        var currentCategoryId = '',
            currentTownId = '',
            currentPage = 1;

        /* pagination */
        $scope.totalAds = 0;
        $scope.adsPerPage = 5;
        getResultsPage(1);

        $scope.pagination = {
            current: 1
        };

        $scope.pageChanged = function(newPage) {
            getResultsPage(newPage);
        };

        function getResultsPage(pageNumber) {
            adsData.getAll(pageNumber, currentTownId, currentCategoryId).then(function(data) {
                $scope.adsData = data;
                $scope.totalAds = parseInt(data.numPages) * 5;
                currentPage = pageNumber;
            }, function(error) {
                console.log(error);
            });
        }

        /* get all categoreis */
        categoriesData.getAll().then(function(data) {
            $scope.categoriesData = data;
        }, function(error) {
            console.log(error);
        });

        /* filter ads by category */
        $scope.filterByCategory = function(categoryId, cateogryName) {
            adsData.getByCategory(categoryId, currentTownId, currentPage).then(function(data) {
                $scope.adsData = data;
                $scope.totalAds = parseInt(data.numPages) * 5;
                $scope.categoryFilter = cateogryName;
                currentCategoryId = categoryId;
            }, function(error) {
                console.log(error);
            });
        };

        /* get all towns*/
        townsData.getAll().then(function(data) {
            $scope.townsData = data;
        }, function(error) {
            console.log(error);
        });

        /* filter ads by town*/
        $scope.filterByTown = function(townId, townName) {
            adsData.getByTown(townId, currentCategoryId, currentPage).then(function(data) {
                $scope.adsData = data;
                $scope.totalAds = parseInt(data.numPages) * 5;
                $scope.townFilter = townName;
                currentTownId = townId;
            }, function(error) {
                console.log(error);
            });
        };
    });