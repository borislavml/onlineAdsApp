var onlineAdsAppControllers = onlineAdsAppControllers || angular.module('onlineAdsAppControllers', []);
/* login controller*/
onlineAdsAppControllers.controller('RegisterController',
    function registerController($scope, $rootScope, authenticationService, authorizationService, townsData, ajaxErrorText) {
        var errorMessage;
        $rootScope.$broadcast('userLoginRegister');
        $scope.registrationActive = true;
        $scope.EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        $scope.PHONE_REGEXP = /^\d+$/;

        /* get all towns */
        townsData.getAll().then(function(data) {
            $scope.townsData = data;
        }, function(error) {
            $rootScope.$broadcast('operatonError', ajaxErrorText);
        });

        $scope.register = function(credentials, registerForm) {
            if (registerForm.$valid) {
                authenticationService.register(credentials).then(function(data) {
                    authorizationService.setUserSession(data);
                    $rootScope.$broadcast('operatonSuccessfull', 'User account created.Please login');
                }, function(error) {
                    errorMessage = error.modelState;
                    handleErrorMessage(errorMessage);
                });
            }
        };

        /* hdnle errors with registration data */
        function handleErrorMessage(errorMessage) {
            if (errorMessage['']) {
                $rootScope.$broadcast('operatonError', errorMessage[''][0]);
            } else if (errorMessage['model.ConfirmPassword']) {
                $rootScope.$broadcast('operatonError', errorMessage['model.ConfirmPassword'][0]);
            } else {
                $rootScope.$broadcast('operatonError', ajaxErrorText);
            }
        }
    });