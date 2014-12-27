/* Serrvice for getting all categories  */
onlineAdsApp.factory('categoriesData', function categoriesData($http) {
    function getAllCategories(success, error) {
        $http({
            method: 'GET',
            url: 'http://localhost:1337/api/categories'
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
        getAll: getAllCategories,
    };
});