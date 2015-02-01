/* App Module */
var onlineAdsApp = angular.module('onlineAdsApp', [
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ui.bootstrap',
    'angularUtils.directives.dirPagination',
    'onlineAdsAppControllers',
]);

/* Configure routing and URL paths */
onlineAdsApp.config(['$routeProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider.
        when('/login', {
            templateUrl: 'templates/login.html',
            controller: 'LoginController'
        }).
        when('/register', {
            templateUrl: 'templates/register.html',
            controller: 'RegisterController'
        }).
        when('/home', {
            templateUrl: 'templates/home.html',
            controller: 'HomeController'
        }).
        when('/user/ads', {
            templateUrl: 'templates/user-allAds.html',
            controller: 'UserAllAdsController',
        }).
        when('/user/ads/published', {
            templateUrl: 'templates/user-allAds.html',
            controller: 'UserAllAdsController',
        }).
        when('/user/ads/waitingapproval', {
            templateUrl: 'templates/user-allAds.html',
            controller: 'UserAllAdsController',
        }).
        when('/user/ads/inactive', {
            templateUrl: 'templates/user-allAds.html',
            controller: 'UserAllAdsController',
        }).
        when('/user/ads/rejected', {
            templateUrl: 'templates/user-allAds.html',
            controller: 'UserAllAdsController',
        }).
        when('/user/publish-new-add', {
            templateUrl: 'templates/publish-new-add.html',
            controller: 'UserPiblishAdController'
        }).
        when('/user/profile', {
            templateUrl: 'templates/user-profile.html',
            controller: 'UserProfileController'
        }).
        when('/user/troubleshoot', {
            templateUrl: 'templates/troubleshoot.html'
        }).
        when('/unauthorized', {
            templateUrl: 'templates/unauthorized.html'
        }).
        when('/admin/home', {
            templateUrl: 'templates/admin-ads.html',
            controller: 'AdminAdsController'
        }).
        when('/admin/ads/published', {
            templateUrl: 'templates/admin-ads.html',
            controller: 'AdminAdsController'
        }).
        when('/admin/ads/waitingapproval', {
            templateUrl: 'templates/admin-ads.html',
            controller: 'AdminAdsController'
        }).
        when('/admin/ads/inactive', {
            templateUrl: 'templates/admin-ads.html',
            controller: 'AdminAdsController'
        }).
        when('/admin/ads/rejected', {
            templateUrl: 'templates/admin-ads.html',
            controller: 'AdminAdsController'
        }).
        otherwise({
            redirectTo: '/home'
        });
    }
]).
run(function($rootScope, $location, authorizationService) {
    $rootScope.$on('$routeChangeStart', function(event, next) {
        var path = $location.path();
        if (!authorizationService.userIsLogged() && path !== '/login' && path !== '/register' && path !== '/home') {
            $location.path('/unauthorized');
        } else if (authorizationService.userIsLogged()) {
            if (!authorizationService.userIsAdmin() && path.indexOf("admin") > -1) {
                $location.path('/unauthorized');
            };
        };
    });
}).
constant('baseUrl', 'http://localhost:1337/api')
.constant('imageSize', '50kb')
.constant('ajaxErrorText', 'Something went wrong, please try again or refresh the page.')
.constant('adsPerPageUser', '5')
.constant('adsPerPageAdmin', '3');