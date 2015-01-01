onlineAdsApp.controller('MainController',
    function mainController($scope, $rootScope, $window, $location, authorizationService, authenticationService) {
        var userInfo;

        // handle refreshing page to store service state and user data
        function init() {
            if (authorizationService.userIsLogged()) {
                userInfo = authorizationService.getCurrentUser();
                $scope.userIsLogged = true;
                $scope.currentUser = userInfo.userName;
                if ($scope.clickedMyAdds) {

                }
            } else {
                $scope.userIsLogged = false;
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
            $scope.clickedMyAds = false;
            $location.path('/home');
        };

        $scope.loadHomePage = function() {
            $location.path('/home');
            $scope.clickedMyAds = false;
        };

        $scope.loadUserAds = function(adsWithStatus) {
            if (authorizationService.userIsLogged()) {
                $scope.userIsLogged = true;
                $location.path('/user/ads-all');
                $scope.clickedMyAds = true;
            }
        };

        $scope.publishNewAdd = function() {
            if (authorizationService.userIsLogged()) {
                $scope.userIsLogged = true;
                $scope.clickedMyAds = false;
                $location.path('/user/publish-new-add');
            }
        };

        $scope.editProfile = function() {
            if (authorizationService.userIsLogged()) {
                $scope.userIsLogged = true;
                $scope.clickedMyAds = false;
                $location.path('/user/profile');
            }
        };
    });