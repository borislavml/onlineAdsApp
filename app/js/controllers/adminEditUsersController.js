var onlineAdsAppControllers = onlineAdsAppControllers || angular.module('onlineAdsAppControllers', []);

onlineAdsAppControllers.controller('AdminEditUsersController',
    function adminEditUsersController($scope, $rootScope, $route, $location, authorizationService, userProfile,
        townsData, errorsService, usersPerPage) {
        var userID = $location.path().substr(18);
        $scope.currentUser;

        /* get towns for dropdown */
        townsData.getAll().then(function(data) {
            $scope.townsData = data;
        }, function(error) {
            errorsService.handleError(error);
        });

        userProfile.adminGetUserById(userID).then(function(data) {
            $scope.currentUser = data.userName;
            $scope.editProfileForm = {
                userName: data.userName,
                name: data.name,
                email: data.email,
                phoneNumber: data.phoneNumber ? data.phoneNumber : '',
                townId: data.townId ? data.townId : null,
                isAdmin: data.isAdmin,
            };
        }, function(error) {
            errorsService.handleError(error);
        });

        $scope.updateProfile = function(editProfileForm) {
            if (!editProfileForm.userName || !editProfileForm.name || !editProfileForm.email || !editProfileForm.phoneNumber) {
                return;
            }

            userProfile.adminUpdateUser($scope.currentUser, editProfileForm).then(function(data) {
                $route.reload();
                $rootScope.$broadcast('alertMessage', data.message);
            }, function(error) {
                errorsService.handleError(error);
            });
        };

        $scope.changePassword = function(credentials, changePasswordForm) {
            if (!credentials.newPassword || !credentials.confirmPassword) {
                return;
            }

            credentials.username = $scope.currentUser;
            userProfile.adminSetUserPassword(credentials).then(function(data) {
                $route.reload();
                $rootScope.$broadcast('alertMessage', data.message);
            }, function(error) {
                errorMessage = error.modelState;
                errorsService.handleProfileEditError(errorMessage);
            });
        };

        

    });