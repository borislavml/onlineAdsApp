onlineAdsApp.controller('MainController',
    function mainController($scope, $rootScope, $window, $location, authorizationService, authenticationService) {
        var userInfo;
        // handle refreshing page to store service state and user data
        function init() {
            if ($window.sessionStorage["currentUser"]) {
                userInfo = authorizationService.getCurrentUser();
                $scope.userIsLogged = true;
                $scope.userIsNotLogged = false;
                $scope.currentUser = userInfo.userName;        
            } else {
                $scope.userIsLogged = false;
                $scope.userIsNotLogged = true;
                $scope.clickedMyAdds = false;
                // This event is sent by loginController when the user has logged
                $rootScope.$on("userHasLogged", function() {
                    $scope.userIsLogged = authorizationService.userIsLogged();
                    $scope.userIsNotLogged = !authorizationService.userIsLogged();
                    $scope.currentUser = authorizationService.getUsername();
                });
            }
        }

        init();

        $scope.logout = function() {
            authenticationService.logout();
            $scope.userIsLogged = false;
            $scope.userIsNotLogged = true;
            $scope.clickedMyAds = false;
            $location.path('/home');
        };

        $scope.loadHomePage = function() {
            $location.path('/home');
            $scope.clickedMyAds = false;
        };

        $scope.loadUserAds = function() {
            if ($window.sessionStorage['currentUser']) {
                $scope.userIsLogged = true;
                $scope.userIsNotLogged = false;
                $location.path('/user/ads');
                $scope.clickedMyAds = true;
            }
        };

        $scope.publishNewAdd = function() {
            if ($window.sessionStorage['currentUser']) {
                $scope.userIsLogged = true;
                $scope.userIsNotLogged = false;
                $scope.clickedMyAds = false;
                $location.path('/user/publish-new-add');
                
            }
        };

        $scope.editProfile = function() {
            if ($window.sessionStorage['currentUser']) {
                $scope.userIsLogged = true;
                $scope.userIsNotLogged = false;
                $scope.clickedMyAds = false;
                $location.path('/user/profile');
                
            }
        };
    });