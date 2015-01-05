onlineAdsApp.factory('userProfile', function ($http, $q, baseUrl, authorizationService) {
	 function getProfile() {
        var deferred = $q.defer();
        var headers = authorizationService.getAuthorizationHeaders();

        $http({
            method: 'GET',
            url: baseUrl + '/user/profile',
            headers: headers
        })
            .success(function(data, status, headers, config) {
                deferred.resolve(data, status, headers, config);
            })
            .error(function(data, status, headers, config) {
                deferred.reject(data, status, headers, config);
            });

        return deferred.promise;
    }

     function ediProfile(data) {
        var deferred = $q.defer();
        var headers = authorizationService.getAuthorizationHeaders();

        $http({
            method: 'PUT',
            url: baseUrl + '/user/profile',
            headers: headers,
            data: data
        })
            .success(function(data, status, headers, config) {
                deferred.resolve(data, status, headers, config);
            })
            .error(function(data, status, headers, config) {
                deferred.reject(data, status, headers, config);
            });

        return deferred.promise;
    }

     function changePassword(data) {
        var deferred = $q.defer();
        var headers = authorizationService.getAuthorizationHeaders();

        $http({
            method: 'PUT',
            url: baseUrl + '/user/changePassword',
            headers: headers,
            data: data
        })
            .success(function(data, status, headers, config) {
                deferred.resolve(data, status, headers, config);
            })
            .error(function(data, status, headers, config) {
                deferred.reject(data, status, headers, config);
            });

        return deferred.promise;
    }

	return {
       getProfile: getProfile,
       ediProfile: ediProfile,
       changePassword: changePassword
	};
});