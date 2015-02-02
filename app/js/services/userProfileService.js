onlineAdsApp.factory('userProfile', function($http, $q, baseUrl, authorizationService) {
    function userRequester(method, url, data) {
        var deferred = $q.defer();
        var headers = authorizationService.getAuthorizationHeaders();

        $http({
            method: method,
            url: url,
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

    var getProfile = function() {
        return userRequester('GET', baseUrl + '/user/profile', null);
    };

    var ediProfile = function(data) {
        return userRequester('PUT', baseUrl + '/user/profile', data);
    };

    var changePassword = function(data) {
        return userRequester('PUT', baseUrl + '/user/changePassword', data);
    };

    /* admin requests */
    var adminGetAllUsers = function(usersPerPage, pageNumber) {
        return userRequester('GET', baseUrl + '/admin/users/?pagesize=' + usersPerPage + '&startpage=' + pageNumber, null)
    }

    var adminGetUserById = function(userId) {
        return userRequester('GET', baseUrl + '/admin/users/' + userId, null)
    }

    var adminUpdateUser = function(userName, editProfileForm) {
        return userRequester('PUT', baseUrl + '/admin/user/' + userName, editProfileForm)
    }

    var adminSetUserPassword = function(credentials) {
        return userRequester('PUT', baseUrl + '/admin/setpassword', credentials)
    }

    var adminDeleteUser = function(username) {
        return userRequester('DELETE', baseUrl + '/admin/user/' + username , null)
    }

    return {
        getProfile: getProfile,
        ediProfile: ediProfile,
        changePassword: changePassword,
        adminGetAllUsers: adminGetAllUsers,
        adminGetUserById: adminGetUserById,
        adminUpdateUser: adminUpdateUser,
        adminSetUserPassword: adminSetUserPassword,
        adminDeleteUser: adminDeleteUser
    };
});