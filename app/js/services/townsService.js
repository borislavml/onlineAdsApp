/* Serrvice for getting all  towns  */
onlineAdsApp.factory('townsData', function townsData($http, $q, baseUrl) {
    function getAllTowns() {
        var deferred = $q.defer();

        $http({
            method: 'GET',
            url: baseUrl + '/towns'
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
        getAll: getAllTowns,
    };
});