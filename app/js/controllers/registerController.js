var onlineAdsAppControllers = onlineAdsAppControllers || angular.module('onlineAdsAppControllers', []);
/* login controller*/
onlineAdsAppControllers.controller('RegisterController',
    function registerController($scope, $rootScope, $location, authenticationService, authorizationService,
        townsData, errorsService) {
        var errorMessage;

        $rootScope.$broadcast('userLoginRegister');
        $scope.registrationActive = true;
        $scope.EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        $scope.PHONE_REGEXP = /^\d+$/;

        /* get all towns */
        townsData.getAll().then(function(data) {
            $scope.townsData = data;
        }, function(error) {
            $rootScope.$broadcast('alertMessage', ajaxErrorText);
        });

        $scope.register = function(credentials, registerForm) {
            if (registerForm.$valid) {
                authenticationService.register(credentials).then(function(data) {
                    authorizationService.setUserSession(data);
                    $rootScope.$broadcast('alertMessage', 'User account created.Please login');
                    $location.path('/login');
                }, function(error) {
                    errorMessage = error.modelState;
                    errorsService.handleRegisterError(errorMessage);
                });
            }
        };
    });