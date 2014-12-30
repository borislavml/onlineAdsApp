onlineAdsApp.controller('HeaderController',
    function headerController($scope, $rootScope, $window, $location, authorizationService, authenticationService) {
        var userInfo;
        // handle refreshing page to store service state and user data
        function init() {
            if ($window.sessionStorage["currentUser"]) {
                userInfo = JSON.parse($window.sessionStorage["currentUser"]);
                $scope.userIsLogged = true;
                $scope.userIsNotLogged = false;
            } else {
                $scope.userIsLogged = false;
                $scope.userIsNotLogged = true;
                // This event is sent by loginController when the user has logged
                $rootScope.$on("userHasLogged", function() {
                    $scope.userIsLogged = authorizationService.userIsLogged();
                    $scope.userIsNotLogged = !authorizationService.userIsLogged();
                });
            }
        }

        init();

        $scope.logout = function() {
            authenticationService.logout();
            $scope.userIsLogged = false;
            $scope.userIsNotLogged = true;
            $location.path('/home');
        };

    });