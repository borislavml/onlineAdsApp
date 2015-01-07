onlineAdsApp.controller('MainController',
    function mainController($scope, $rootScope, $window, $location, $timeout, authorizationService, authenticationService) {
        var currentUrl;

        /* handle alert messages */
        $scope.alertDialog = false;
        $scope.homePage = true;
        $scope.alertMsg = '';
        $scope.alertType = '';

        $scope.closeAlert = function() {
            $scope.alertDialog = false;
            $('.alerts-div').css('z-index', -1);
        };

        /* This event is sent by all controllers after success/error ajax callback */
        $scope.$on('alertMessage', function(event, message) {
            $scope.alertDialog = true;
            $scope.alertMsg = message;
            $scope.alertType = 'danger';
            $('.alerts-div').css('z-index', 99);

            /* autohide alert message */
            $timeout(function() {
                $("#current-alert").fadeTo(500, 0).slideUp(500, function() {
                    $scope.alertDialog = false;
                    $('.alerts-div').css('z-index', -1);
                });
            }, 5000);
        });

        /*this event is sent by login and register controller in order to hide home page navs */
        $scope.$on('userLoginRegister', function() {
            $scope.homePage = false;
        });

        /* handle refreshing page to store services state and user data */
        function init() {
            $scope.loading = true;
            if (authorizationService.userIsLogged()) {
                $scope.userIsLogged = true;
                $scope.homePage = false;
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
                $scope.homePage = false;
                $scope.currentUser = authorizationService.getUsername();
            });
        }

        init();

        $scope.logout = function() {
            authenticationService.logout();
            $scope.userIsLogged = false;
            $scope.clickedMyAds = false;
            $scope.homePage = true;
            $location.path('/home');

            /* alert user */
            $scope.alertDialog = true;
            $scope.alertMsg = 'Goodbye ' + $scope.currentUser + '.Thank you for using our services!';
            $scope.alertType = 'danger';
            $('.alerts-div').css('z-index', 99);

            /* autohide alert message */
            $timeout(function() {
                $("#current-alert").fadeTo(500, 0).slideUp(500, function() {
                    $scope.alertDialog = false;
                    $('.alerts-div').css('z-index', -1);
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
        
        /* redirect user to troubleshoot page */
        $scope.troubleshoot = function() {
            if (authorizationService.userIsLogged()) {
                $scope.userIsLogged = true;
                $scope.clickedMyAds = false;
                $location.path('/user/troubleshoot');
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

/* back to top button */
$(document).ready(function() {
    var offset = 220;
    var duration = 500;
    $(window).scroll(function() {
        if ($(this).scrollTop() > offset) {
            $('.back-to-top').fadeIn(duration);
        } else {
            $('.back-to-top').fadeOut(duration);
        }
    });
    $('.back-to-top').click(function(event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, duration);
        return false;
    });
});