var onlineAdsAppControllers = onlineAdsAppControllers || angular.module('onlineAdsAppControllers', []);
/* login controller*/
onlineAdsAppControllers.controller('RegisterController',
    function registerController($scope, authenticationService, authorizationService, townsData) {
        var errorMessage = {};

        $scope.errorOccurred = false;
        $scope.alertMsg = '';
        $scope.alertType = '';

        $scope.closeAlert = function() {
            $scope.errorOccurred = false;
        };

        $scope.registrationActive = true;

        /* get all towns*/
        townsData.getAll().then(function(data) {
            $scope.townsData = data;
        }, function(error) {
            $scope.alertMsg = 'An error occurred.Sorry for the inconvenience.Please try refreshing the page';
            console.log(error);
        });

        $scope.register = function(credentials, registerForm) {
            if (registerForm.$valid) {
                authenticationService.register(credentials).then(function(data) {
                    authorizationService.setUserSession(data);                
                    $scope.errorOccurred = true;
                    $scope.registrationActive = false;

                    $scope.alertType = 'success';
                    $scope.alertMsg = 'User account created.Please login';
                }, function(error) {
                    errorMessage = error.modelState;
                    handleErrorMessage(errorMessage);
                });
            }
        };

        function handleErrorMessage(errorMessage) {
            if (errorMessage['']) {
                $scope.errorOccurred = true;
                $scope.alertType = 'danger';
                $scope.alertMsg = errorMessage[''][0];
            } else if (errorMessage['model.ConfirmPassword']) {
                $scope.errorOccurred = true;
                $scope.alertType = 'danger';
                $scope.alertMsg = errorMessage['model.ConfirmPassword'][0];
            }
        }
    });