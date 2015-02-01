var onlineAdsAppControllers = onlineAdsAppControllers || angular.module('onlineAdsAppControllers', []);

onlineAdsAppControllers.controller('UserProfileController',
    function userProfileController($scope, $rootScope, $route, userProfile, townsData, errorsService) {
        var errorMessage;

        /* get towns for dropdown */
        townsData.getAll().then(function(data) {
            $scope.townsData = data;
        }, function(error) {
            errorsService.handleError(error);
        });

        userProfile.getProfile().then(function(data) {
            $scope.currentuser = data;
            $scope.editProfileForm = {
                name: data.name,
                email: data.email,
                phoneNumber: data.phoneNumber ? data.phoneNumber : '',
                townId: data.townId ? data.townId : null,
            };
        }, function(error) {
            errorsService.handleError(error);
        });

        $scope.updateProfile = function(editProfileForm) {
            if (!editProfileForm.name || !editProfileForm.email || !editProfileForm.phoneNumber) {
                return;
            }

            userProfile.ediProfile(editProfileForm).then(function(data) {
                $route.reload();
                $rootScope.$broadcast('alertMessage', data.message);
            }, function(error) {
                errorsService.handleError(error);
            });
        };

        $scope.changePassword = function(credentials, changePasswordForm) {
            if (!credentials.newPassword || !credentials.confirmPassword ||
                !credentials.oldPassword) {
                return;
            }

            userProfile.changePassword(credentials).then(function(data) {
                $route.reload();
                $rootScope.$broadcast('alertMessage', data.message);
            }, function(error) {
                errorMessage = error.modelState;
                errorsService.handleProfileEditError(errorMessage);
            });
        };
    });