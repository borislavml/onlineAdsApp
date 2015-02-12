var onlineAdsAppControllers = onlineAdsAppControllers || angular.module('onlineAdsAppControllers', []);

onlineAdsAppControllers.controller('AdminUsersController',
    function adminUsersController($scope, $rootScope, $route, $location, $modal, authorizationService, userProfile,
        townsData, errorsService, usersPerPage) {
        /* pagination */
        var currentPage;

        $scope.totalUsers = 0;
        $scope.usersPerPage = parseInt(usersPerPage);
        getResultsPage(1);

        $scope.pagination = {
            current: 1
        };

        $scope.pageChanged = function(newPage) {
            getResultsPage(newPage);
        };

        function getResultsPage(pageNumber) {
            userProfile.adminGetAllUsers($scope.usersPerPage, pageNumber).then(function(data) {
                $scope.noUsersToDisplay = false;
                $scope.loading = true;
                $scope.usersData = data;

                if (data.users.length === 0) {
                    $scope.noUsersToDisplay = true;
                }

                $scope.totalUsers = data.numPages * $scope.usersPerPage;
                $scope.totalUsersCount = data.numItems;
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
            var usersPerPage = parseInt(count);
            userProfile.adminGetAllUsers(usersPerPage, currentPage).then(function(data) {
                $scope.noUsersToDisplay = false;
                $scope.loading = true;
                $scope.usersData = data;

                if (data.users.length === 0) {
                    $scope.noUsersToDisplay = true;
                }

                $scope.totalUsers = data.numPages * usersPerPage;
                $scope.totalUsersCount = data.numItems;
                $scope.usersPerPage = usersPerPage
            }, function(error) {
                errorsService.handleError(error);
            }).finally(function() {
                $scope.loading = false;
                $('html, body').animate({
                    scrollTop: 0
                }, 1000);
            });
        };

        $scope.editUserProfile = function(userId) {
            $scope.userIsAdmin = true;
            $scope.clickedMyAdsAdmin = false;
            $location.path('/admin/users/edit/' + userId);
        }

        /* open a modal dialog to ask admin for confirmg user delete
         -requests are executed in the modal controler */
        $scope.openModal = function(userID) {
            var modalInstance = $modal.open({
                templateUrl: './templates/admin-delete-user-modal-template.html',
                controller: 'AdminDeleteUserModalController',
                backdrop: false,
                keyboard: false,
                resolve: {
                     userID: function() {
                        return userID;
                    }
                }
            });
        };
    });