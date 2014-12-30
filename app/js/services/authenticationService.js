onlineAdsApp.factory('authenticationService', 
	function authentication($http, $q, baseUrl, authorizationService) {

    function login(credentials) {
        var deferred = $q.defer();

        $http({
            method: 'POST',
            url: baseUrl + '/user/login',
            data: credentials
        })
            .success(function(data, status, headers, config) {              
                deferred.resolve(data, status, headers, config);
            })
            .error(function(data, status, headers, config) {
                deferred.reject(data, status, headers, config);
            });

        return deferred.promise;
    }

    function register(credentials) {
        var deferred = $q.defer();

        $http({
            method: 'POST',
            url: baseUrl + '/user/register',
            data: credentials
        })
            .success(function(data, status, headers, config) {              
                deferred.resolve(data, status, headers, config);
            })
            .error(function(data, status, headers, config) {
                deferred.reject(data, status, headers, config);
            });

        return deferred.promise;
    }

    function logout(){
         var deferred = $q.defer();
          headers = authorizationService.getAuthorizationHeaders();
        $http({
            method: 'POST',
            url: baseUrl + '/user/logout',
            data: {},
            headers: headers
        })
            .success(function(data, status, headers, config) {
                authorizationService.deleteAuthorizationHeaders();
                delete sessionStorage['currentUser'];              
                deferred.resolve(data, status, headers, config);
            })
            .error(function(data, status, headers, config) {
                deferred.reject(data, status, headers, config);
            });

        return deferred.promise;
    }

    return {
        login: login,
        register: register,
        logout: logout
    };
});