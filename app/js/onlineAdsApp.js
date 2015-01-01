/* App Module */
var onlineAdsApp = angular.module('onlineAdsApp', [
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ui.bootstrap',
    'angularUtils.directives.dirPagination',
    'onlineAdsAppControllers',
    'onlineAdsAppFilters'
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
        when('/user/publish-new-add', {
            templateUrl: 'templates/publish-new-add.html',
            controller: 'UserAllAdsController'
        }).
        when('/user/profile', {
            templateUrl: 'templates/user-profile.html',
            controller: 'UserProfileController'
        }).
        when('/unauthorized', {
            templateUrl: 'templates/unauthorized.html'
        }).
        otherwise({
            redirectTo: '/home'
        });
    }
]).
run(function($rootScope, $location, authorizationService) {
    $rootScope.$on('$routeChangeStart', function(event, next) {
        var path = $location.path();
        if (!authorizationService.userIsLogged() && path !== '/login' &&
            path !== '/register' && path !== '/home') {
            $location.path('/unauthorized');
        }
    });
}).
constant('baseUrl', 'http://localhost:1337/api');