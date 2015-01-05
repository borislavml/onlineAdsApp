var onlineAdsAppControllers = onlineAdsAppControllers || angular.module('onlineAdsAppControllers', []);
/* login controller*/
onlineAdsAppControllers.controller('RegisterController',
    function registerController($scope,$rootScope, authenticationService, authorizationService, townsData, ajaxErrorText) {
        $scope.registrationActive = true;

        // get all towns
        townsData.getAll().then(function(data) {
            $scope.townsData = data;
        }, function(error) {
            $rootScope.$broadcast('operatonError', ajaxErrorText);
        });

        $scope.register = function(credentials, registerForm) {
            if (registerForm.$valid) {
                authenticationService.register(credentials).then(function(data) {
                    authorizationService.setUserSession(data);
                    $scope.registrationActive = false;
                     $rootScope.$broadcast('operatonSuccessfull', 'User account created.Please login');
                }, function(error) {
                    errorMessage = error.modelState;
                    handleErrorMessage(errorMessage);
                });
            }
        };
        
        /* hdnle errors with registration data */
        function handleErrorMessage(errorMessage) {
            $scope.errorOccurred = true;
            if (errorMessage['']) {
                $rootScope.$broadcast('operatonError', errorMessage[''][0]);
            } else if (errorMessage['model.ConfirmPassword']) {
                $rootScope.$broadcast('operatonError', errorMessage['model.ConfirmPassword'][0]);
            } else {
                $rootScope.$broadcast('operatonError', ajaxErrorText);
            }
        }
    });