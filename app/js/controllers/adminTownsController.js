var onlineAdsAppControllers = onlineAdsAppControllers || angular.module('onlineAdsAppControllers', []);

onlineAdsAppControllers.controller('AdminTownsController',
    function adminTownsController($scope, $rootScope, $modal, authorizationService, townsData,
        errorsService, townsPerPageAdmin) {
        /* pagination */
        var currentPage;

        $scope.totaTowns = 0;
        $scope.townsPerPage = parseInt(townsPerPageAdmin);
        getResultsPage(1);

        $scope.pagination = {
            current: 1
        };

        $scope.pageChanged = function(newPage) {
            getResultsPage(newPage);
        };

        function getResultsPage(pageNumber) {
            townsData.adminGetAll(pageNumber, $scope.townsPerPage).then(function(data) {
                $scope.noTownsToDisplay = false;
                $scope.loading = true;
                $scope.townsData = data;

                if (data.towns.length === 0) {
                    $scope.noTownsToDisplay = true;
                }

                $scope.totaTowns = data.numPages * $scope.townsPerPage;
                $scope.totaTownsCount = data.numItems;
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

        $scope.filterByCount = function(count) {
            var townsPerPage = parseInt(count);

            townsData.adminGetAll(currentPage, townsPerPage).then(function(data) {
                $scope.noTownsToDisplay = false;
                $scope.loading = true;
                $scope.townsData = data;

                if (data.towns.length === 0) {
                    $scope.noTownsToDisplay = true;
                }

                $scope.totaTowns = data.numPages * $scope.townsPerPage;
                $scope.totaTownsCount = data.numItems;
                $scope.townsPerPage = townsPerPage;
            }, function(error) {
                errorsService.handleError(error);
            }).finally(function() {
                $scope.loading = false;
                $('html, body').animate({
                    scrollTop: 0
                }, 1000);
            });
        };

        /* open a modal dialog to ask admin for new town
         -requests are executed in the AdminAddTownModalControler */
        $scope.addTown = function() {
            var modalInstance = $modal.open({
                templateUrl: './templates/admin-add-town-modal-template.html',
                controller: 'AdminAddTownModalController',
                backdrop: false,
                keyboard: false
            });
        };

        /* open a modal dialog to ask admin for confirming deleting towns
         -requests are executed in the AdminDeleteTownModalControler */
        $scope.deleteTown = function(townName, townID) {
            var modalInstance = $modal.open({
                templateUrl: './templates/admin-delete-town-modal-template.html',
                controller: 'AdminDeleteTownModalController',
                backdrop: false,
                keyboard: false,
                resolve: {
                    townName: function() {
                        return townName;
                    },
                    townID: function() {
                        return townID;
                    },
                }
            });
        };

        /* open a modal dialog for admin to edit current town
         -requests are executed in the AdminEditTownModalControler */
        $scope.editTown = function(townName, townID) {
            var modalInstance = $modal.open({
                templateUrl: './templates/admin-edit-town-modal-template.html',
                controller: 'AdminEditTownModalController',
                backdrop: false,
                keyboard: false,
                resolve: {
                    townName: function() {
                        return townName;
                    },
                    townID: function() {
                        return townID;
                    },
                }
            });
        };
    });