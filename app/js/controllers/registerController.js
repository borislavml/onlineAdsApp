var onlineAdsAppControllers = onlineAdsAppControllers || angular.module('onlineAdsAppControllers', []);
/* login controller*/
onlineAdsAppControllers.controller('RegisterController',
    function registerController($scope, authenticationService, authorizationService, townsData, ajaxErrorText) {
        var errorMessage = {};

        $scope.errorOccurred = false;
        $scope.registrationActive = true;
        $scope.alertMsg = '';
        $scope.alertType = '';

        $scope.closeAlert = function() {
            $scope.errorOccurred = false;
        };

        // get all towns
        townsData.getAll().then(function(data) {
            $scope.townsData = data;
        }, function(error) {
            // $scope.alertMsg = ajaxErrorText;
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
            $scope.errorOccurred = true;
            if (errorMessage['']) {
                $scope.alertType = 'danger';
                $scope.alertMsg = errorMessage[''][0];
            } else if (errorMessage['model.ConfirmPassword']) {
                $scope.alertType = 'danger';
                $scope.alertMsg = errorMessage['model.ConfirmPassword'][0];
            } else {
                $scope.alertType = 'danger';
                $scope.alertMsg = ajaxErrorText;
            }
        }
    });