/* Serrvice for getting all categories  */
onlineAdsApp.factory('categoriesData', function categoriesData($http, $q, baseUrl, authorizationService) {
    function categoriesRequester(method, url, data) {
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

    var getAllCategories = function() {
        return categoriesRequester('GET', baseUrl + '/categories', null);
    };

    /* admin categories services */
    var adminGetAllCategories = function(pageNumber, categoiresPerPage) {
        return categoriesRequester('GET', baseUrl + '/admin/categories?pagesize=' + categoiresPerPage + '&startpage=' +
            pageNumber, null);
    };

    var adminAddCategory = function(name) {
        return categoriesRequester('POST', baseUrl + '/admin/categories', name);
    };

    var adminDeleteCategory = function(categoryID) {
        return categoriesRequester('DELETE', baseUrl + '/admin/categories/' + categoryID, null);
    };

    var adminEditCategory = function(categoryID,name) {
        return categoriesRequester('PUT', baseUrl + '/admin/categories/' + categoryID, name);
    };

    return {
        getAll: getAllCategories,
        adminGetAll: adminGetAllCategories,
        addCategory: adminAddCategory,
        deleteCategory: adminDeleteCategory,
        editCategory: adminEditCategory,
    };
});