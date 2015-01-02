onlineAdsApp.controller('MainController',
    function mainController($scope, $rootScope, $window, $location, authorizationService, authenticationService) {
        var currentUrl;

        // handle refreshing page to store service state and user data
        function init() {
            if (authorizationService.userIsLogged()) {
                $scope.userIsLogged = true;
                $scope.currentUser = authorizationService.getUsername();
                // show my ads nav on refresh if clicked
                currentUrl = $location.path();
                if (currentUrl === '/user/ads' || currentUrl === '/user/ads/published' ||
                 currentUrl === '/user/ads/waitingapproval' ||currentUrl === '/user/ads/inactive' || 
                 currentUrl === '/user/ads/rejected') {
                    $scope.clickedMyAds = true;
                }
            } else {
                $scope.userIsLogged = false;
                $scope.clickedMyAdds = false;
            }
            // This event is sent by loginController when the user has logged 
            // to hide login/register buttons
            $rootScope.$on("userHasLogged", function() {
                $scope.userIsLogged = true;
                $scope.currentUser = authorizationService.getUsername();
            });
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
                $scope.clickedMyAds = true;

                if (adsWithStatus === '') {
                    $location.path('/user/ads');
                } else {
                    $location.path('/user/ads/' + adsWithStatus.toLowerCase());
                }
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

        $scope.getClass = function(path) {
            if ($location.path() === path) {
                return "active";
            } else {
                return "";
            }
        };
    });