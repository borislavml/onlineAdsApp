/* Serrvice for getting ll ads on home page  */
onlineAdsApp.factory('adsData', function adsData($http, $q, baseUrl, authorizationService) {
    function adsRequester(method, url, data) {
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

    /* user ads services */
    var getAllAddsFiltered = function(pageNumber, townId, categoryId, adsPerPage) {
        return adsRequester('GET', baseUrl + '/ads?pagesize=' + adsPerPage  + '&startpage=' + pageNumber +
            '&TownId=' + townId + '&CategoryId=' + categoryId, null);
    };

    var getUserAds = function(pageNumber, adsWithStatus) {
        return adsRequester('GET', baseUrl + '/user/ads?pagesize=3&startpage=' +
            pageNumber + '&status=' + adsWithStatus, null);
    };

    var publishAd = function(newAdData) {
        return adsRequester('POST', baseUrl + '/user/ads', newAdData);
    };

    var deactivateAd = function(id) {
        return adsRequester('PUT', baseUrl + '/user/ads/deactivate/' + id, null);
    };

    var publishAgainAd = function(id) {
        return adsRequester('PUT', baseUrl + '/user/ads/publishagain/' + id, null);
    };

    var deleteAd = function(id) {
        return adsRequester('DELETE', baseUrl + '/user/ads/' + id, null);
    };

    var getAdById = function(id) {
        return adsRequester('GET', baseUrl + '/user/ads/' + id, null);
    };

    var editAd = function(id, editAdData) {
        return adsRequester('PUT', baseUrl + '/user/ads/' + id, editAdData);
    };

    /* admin ads services */
    var adminGetAllAddsFiltered = function(pageNumber, townId, categoryId, adStatus, adsPerPage) {
        return adsRequester('GET', baseUrl + '/admin/ads?pagesize=' + adsPerPage + '&startpage=' + pageNumber +
            '&TownId=' + townId + '&CategoryId=' + categoryId + '&status=' + adStatus, null);
    };

    var adminGetAdById = function(id) {
        return adsRequester('GET', baseUrl + '/admin/ads/' + id, null);
    };

    var adminApproveAd = function(id) {
        return adsRequester('PUT', baseUrl + '/admin/ads/approve/' + id, null);
    };

    var adminRejectAd = function(id) {
        return adsRequester('PUT', baseUrl + '/admin/ads/reject/' + id, null);
    };

    var adminDeleteAd = function(id) {
        return adsRequester('DELETE', baseUrl + '/admin/ads/' + id, null);
    };

     var adminEditAd = function(id, editAdData) {
        return adsRequester('PUT', baseUrl + '/admin/ads/' + id, editAdData);
    };

    return {
        getAllAddsFiltered: getAllAddsFiltered,
        getUserAds: getUserAds,
        publishAd: publishAd,
        deactivateAd: deactivateAd,
        publishAgainAd: publishAgainAd,
        deleteAd: deleteAd,
        getAdById: getAdById,
        editAd: editAd,
        adminGetAllFiltered: adminGetAllAddsFiltered,
        adminGetAdById: adminGetAdById,
        adminApproveAd: adminApproveAd,
        adminRejectAd: adminRejectAd,
        adminDeleteAd: adminDeleteAd,
        adminEditAd: adminEditAd,
    };
});