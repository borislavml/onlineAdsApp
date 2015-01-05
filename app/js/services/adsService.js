/* Serrvice for getting ll ads on home page  */
onlineAdsApp.factory('adsData', function adsData($http, $q, baseUrl, authorizationService) {
    function getAllAdds(pageNumber, townId, categoryId) {
        var deferred = $q.defer();

        $http({
            method: 'GET',
            url: baseUrl + '/ads?pagesize=5&startpage=' + pageNumber + '&TownId=' + townId + '&CategoryId=' + categoryId
        })
            .success(function(data, status, headers, config) {
                deferred.resolve(data, status, headers, config);
            })
            .error(function(data, status, headers, config) {
                deferred.reject(data, status, headers, config);
            });

        return deferred.promise;
    }

    function getAllAdsByTown(townId, categoryId, pageNumber) {
        var deferred = $q.defer();

        $http({
            method: 'GET',
            url: baseUrl + '/ads?pagesize=5&TownId=' + townId + '&CategoryId=' + categoryId + '&startpage=' + pageNumber
        })
            .success(function(data, status, headers, config) {
                deferred.resolve(data, status, headers, config);
            })
            .error(function(data, status, headers, config) {
                deferred.reject(data, status, headers, config);
            });

        return deferred.promise;
    }

    function getAllAdsByCategory(categoryId, townId, pageNumber) {
        var deferred = $q.defer();

        $http({
            method: 'GET',
            url: baseUrl + '/ads?pagesize=5&CategoryId=' + categoryId + '&TownId=' + townId + '&startpage=' + pageNumber
        })
            .success(function(data, status, headers, config) {
                deferred.resolve(data, status, headers, config);
            })
            .error(function(data, status, headers, config) {
                deferred.reject(data, status, headers, config);
            });

        return deferred.promise;
    }

    function getUserAds(pageNumber, adsWithStatus) {
        var deferred = $q.defer();

        var headers = authorizationService.getAuthorizationHeaders();
        $http({
            method: 'GET',
            url: baseUrl + '/user/ads?pagesize=3&startpage=' + pageNumber + '&status=' + adsWithStatus,
            data: {},
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

    function publishAd(newAdData) {
        var deferred = $q.defer();
        
        var headers = authorizationService.getAuthorizationHeaders();
        $http({
            method: 'POST',
            url: baseUrl + '/user/ads',
            data: newAdData,
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

    function deactivateAd(id) {
        var deferred = $q.defer();
        
        var headers = authorizationService.getAuthorizationHeaders();
        $http({
            method: 'PUT',
            url: baseUrl + '/user/ads/deactivate/' + id,
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

     function publishAgainAd(id) {
        var deferred = $q.defer();
        
        var headers = authorizationService.getAuthorizationHeaders();
        $http({
            method: 'PUT',
            url: baseUrl + '/user/ads/publishagain/' + id,
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

    function deleteAd(id) {
        var deferred = $q.defer();
        
        var headers = authorizationService.getAuthorizationHeaders();
        $http({
            method: 'DELETE',
            url: baseUrl + '/user/ads/' + id,
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

    function getAdById(id) {
        var deferred = $q.defer();
        
        var headers = authorizationService.getAuthorizationHeaders();
        $http({
            method: 'GET',
            url: baseUrl + '/user/ads/' + id,
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

     function editAd(id, editAdData) {
        var deferred = $q.defer();
        
        var headers = authorizationService.getAuthorizationHeaders();
        $http({
            method: 'PUT',
            url: baseUrl + '/user/ads/' + id,
            data: editAdData,
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

    return {
        getAll: getAllAdds,
        getByTown: getAllAdsByTown,
        getByCategory: getAllAdsByCategory,
        getUserAds: getUserAds,
        publishAd: publishAd,
        deactivateAd: deactivateAd,
        publishAgainAd: publishAgainAd,
        deleteAd: deleteAd,
        getAdById: getAdById,
        editAd: editAd,
    };
});