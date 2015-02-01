var onlineAdsAppControllers = onlineAdsAppControllers || angular.module('onlineAdsAppControllers', []);
/* login controller*/
onlineAdsAppControllers.controller('LoginController',
    function loginController($scope, $rootScope, $location, authenticationService, authorizationService, errorsService) {
        $rootScope.$broadcast('userLoginRegister');

        $scope.login = function(credentials, loginForm) {
            if (loginForm.$valid) {
                authenticationService.login(credentials).then(function(data) {
                    authorizationService.setUserSession(data);
                    /*  check if user is admin and navigate him to admin home page*/
                    if (authorizationService.userIsAdmin()) {
                        $location.path('/admin/home');
                    } else {
                        $location.path('/home');
                    }
                    
                    /* set an eventHandler on rootScope for user logging */
                    $rootScope.$broadcast('userHasLogged');
                }, function(error) {
                    $scope.errorOccurred = true;
                    errorsService.handleLogingError(error);
                });
            }
        };
    });