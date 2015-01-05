var onlineAdsAppControllers = onlineAdsAppControllers || angular.module('onlineAdsAppControllers', []);
/* login controller*/
onlineAdsAppControllers.controller('LoginController',
    function loginController($scope, $rootScope, $location, authenticationService,
        authorizationService, ajaxErrorText) {

        $scope.login = function(credentials, loginForm) {
            if (loginForm.$valid) {
                authenticationService.login(credentials).then(function(data) {
                    authorizationService.setUserSession(data);
                    /* set an eventHandler on rootScope for user logging */
                    $rootScope.$broadcast('userHasLogged');
                    $location.path('/home');
                }, function(error) {
                    $scope.errorOccurred = true;
                    if (error.error_description) {
                        $rootScope.$broadcast('operatonError', error.error_description);
                    } else {
                        $rootScope.$broadcast('operatonError', ajaxErrorText);
                    }
                });
            }
        };
    });