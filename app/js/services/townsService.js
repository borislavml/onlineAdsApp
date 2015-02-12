/* Serrvice for getting  towns  */
onlineAdsApp.factory('townsData', function townsData($http, $q, baseUrl, authorizationService) {
    function townsRequester(method, url, data) {
        var deferred = $q.defer();
        var headers = authorizationService.getAuthorizationHeaders();

        $http({
            method: method,
            url: url,
            data: data,
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

    var getAllTowns = function() {
        return townsRequester('GET', baseUrl + '/towns', null);
    }

    /* admin towns services */
    var adminGetAllTowns = function(pageNumber, categoiresPerPage) {
        return townsRequester('GET', baseUrl + '/admin/towns?pagesize=' + categoiresPerPage + '&startpage=' +
            pageNumber, null);
    };

    var adminAddTown = function(newTown) {
        return townsRequester('POST', baseUrl + '/admin/towns', newTown);
    };

    var adminDeleteTown = function(townId) {
        return townsRequester('DELETE', baseUrl + '/admin/towns/' + townId, null);
    };

    var adminEditTown = function(townId, newTownName) {
        return townsRequester('PUT', baseUrl + '/admin/towns/' + townId, newTownName);
    };

    return {
        getAll: getAllTowns,
        adminGetAll: adminGetAllTowns,
        adminAddTown: adminAddTown,
        adminDeleteTown: adminDeleteTown,
        adminEditTown: adminEditTown,
    };
});