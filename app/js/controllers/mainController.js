onlineAdsApp.controller('MainController',
    function mainController($scope, $rootScope, $window, $location, $timeout, authorizationService, authenticationService) {
        var currentUrl;

        /* handle alert messages */
        $scope.alertDialog = false;
        $scope.alertMsg = '';
        $scope.alertType = '';

        $scope.closeAlert = function() {
            $scope.alertDialog = false;
        };

        /* This event is sent by all other controllers for  successfully executed operation */
        $scope.$on('operatonSuccessfull', function(event, message) {
            $scope.alertDialog = true;
            $scope.alertMsg = message;
            $scope.alertType = 'success';

            /* autohide alert message */
            $timeout(function() {
                $("#current-alert").fadeTo(500, 0).slideUp(500, function() {
                    $scope.alertDialog = false;
                });
            }, 5000);
        });

        /* This event is sent by all other controllers for  error messages */
        $scope.$on('operatonError', function(event, message) {
            $scope.alertDialog = true;
            $scope.alertMsg = message;
            $scope.alertType = 'danger';

            /* autohide alert message */
            $timeout(function() {
                $("#current-alert").fadeTo(500, 0).slideUp(500, function() {
                    $scope.alertDialog = false;
                });
            }, 5000);
        });

        /* handle refreshing page to store services state and user data */
        function init() {
            $scope.loading = true;
            if (authorizationService.userIsLogged()) {
                $scope.userIsLogged = true;
                $scope.currentUser = authorizationService.getUsername();

                // show my ads nav on refresh if clicked
                currentUrl = $location.path();
                if (currentUrl === '/user/ads' || currentUrl === '/user/ads/published' ||
                    currentUrl === '/user/ads/waitingapproval' || currentUrl === '/user/ads/inactive' ||
                    currentUrl === '/user/ads/rejected') {
                    $scope.clickedMyAds = true;
                }
            } else {
                $scope.userIsLogged = false;
                $scope.clickedMyAdds = false;
            }

            /* This event is sent by LoginController when the user has logged 
             to hide login/register buttons */
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

            /* alert user */
            $scope.alertDialog = true;
            $scope.alertMsg = 'Goodbye ' + $scope.currentUser + '.Thank you for using our services!';
            $scope.alertType = 'success';

            /* autohide alert message */
            $timeout(function() {
                $("#current-alert").fadeTo(500, 0).slideUp(500, function() {
                    $scope.alertDialog = false;
                });
            }, 4000);
        };

        /* when home button or site logo clicked*/
        $scope.loadHomePage = function() {
            $location.path('/home');
            $scope.clickedMyAds = false;
        };

        /* redirect user to route with requested ads-status from myAds-nav 
        ads are loaded in the UserAllAdsController */
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

        /* redirect user to publish-new-add page */
        $scope.publishNewAdd = function() {
            if (authorizationService.userIsLogged()) {
                $scope.userIsLogged = true;
                $scope.clickedMyAds = false;
                $location.path('/user/publish-new-add');
            }
        };

        /* redirect user to edit-profile page */
        $scope.editProfile = function() {
            if (authorizationService.userIsLogged()) {
                $scope.userIsLogged = true;
                $scope.clickedMyAds = false;
                $location.path('/user/profile');
            }
        };

        /* activate clicked links on page refresh*/
        $scope.getClass = function(path) {
            if ($location.path() === path) {
                return "active";
            } else {
                return "";
            }
        };
    });