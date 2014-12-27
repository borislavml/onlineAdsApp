/* Serrvice for getting all  towns  */
onlineAdsApp.factory('townsData', function townnData($http) {
    function getAllTowns(success, error) {
        $http({
            method: 'GET',
            url: 'http://localhost:1337/api/towns'
            // headers: {}
            // data: {}
        })
            .success(function(data, status, headers, config) {
                success(data, status, headers(), config);
            })
            .error(function(data, status, headers, config) {
                error(data, status, headers(), config);
            });
    }

    return {
        getAll: getAllTowns,
    };
});