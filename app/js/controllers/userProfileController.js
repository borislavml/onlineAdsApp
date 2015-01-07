var onlineAdsAppControllers = onlineAdsAppControllers || angular.module('onlineAdsAppControllers', []);

onlineAdsAppControllers.controller('UserProfileController',
    function userProfileController($scope, $rootScope, $route, userProfile, townsData, ajaxErrorText) {
        var errorMessage;

        /* get towns for dropdown */
        townsData.getAll().then(function(data) {
            $scope.townsData = data;
        }, function(error) {
            $rootScope.$broadcast('alertMessage', ajaxErrorText);
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
            $rootScope.$broadcast('alertMessage', ajaxErrorText);
        });

        $scope.updateProfile = function(editProfileForm) {
            if (!editProfileForm.name || !editProfileForm.email || !editProfileForm.phoneNumber) {
                return;
            }

            userProfile.ediProfile(editProfileForm).then(function(data) {
                $route.reload();
                $rootScope.$broadcast('alertMessage', data.message);
            }, function(error) {
                $rootScope.$broadcast('alertMessage', ajaxErrorText);
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
                handleErrorMessage(errorMessage);
            });
        };

        /* hdnle errors with change password data */
        function handleErrorMessage(errorMessage) {
            if (errorMessage['']) {
                $rootScope.$broadcast('alertMessage', errorMessage[''][0]);
            } else if (errorMessage['model.ConfirmPassword']) {
                $rootScope.$broadcast('alertMessage', errorMessage['model.ConfirmPassword'][0]);
            } else {
                $rootScope.$broadcast('alertMessage', ajaxErrorText);
            }
        }
    });