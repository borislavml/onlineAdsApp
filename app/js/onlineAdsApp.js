/* App Module */

var onlineAdsApp = angular.module('onlineAdsApp', [
    'ngSanitize',
    'ngRoute',
    'onlineAdsAppControllers',
    'onlineAdsAppFilters'
]);

/* Configure routing and URL paths */
onlineAdsApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/login', {
            templateUrl: 'templates/login.html',
            //controller: 'loginController'
        }).
        when('/register', {
            templateUrl: 'templates/register.html',
           // controller: 'registerController'
        }).
        when('/home', {
            templateUrl: 'templates/all-ads.html',
           // controller: 'alladsCtrl'
        }).
        otherwise({
            redirectTo: '/home'
        });
    }
]);