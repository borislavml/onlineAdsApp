var onlineAdsAppControllers = onlineAdsAppControllers || angular.module('onlineAdsAppControllers', []);
/* login controller*/
onlineAdsAppControllers.controller('LoginController',
    function loginController($scope, $rootScope, $location, authenticationService,
     authorizationService, ajaxErrorText) {
        $scope.errorOccurred = false;
        $scope.alertMsg = '';

        $scope.closeAlert = function() {
            $scope.errorOccurred = false;
        };

        $scope.login = function(credentials, loginForm) {
            if (loginForm.$valid) {
                authenticationService.login(credentials).then(function(data) {
                    authorizationService.setUserSession(data);
                    // set an eventHandler for user logging
                    $rootScope.$broadcast('userHasLogged');
                    $location.path('/home');
                }, function(error) {
                    $scope.errorOccurred = true;
                    if (error.error_description) {
                        $scope.alertMsg = error.error_description;
                    } else{
                        $scope.alertMsg = ajaxErrorText;
                    }
                });
            }
        };
    });