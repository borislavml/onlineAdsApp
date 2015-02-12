onlineAdsApp.controller('AdminDeleteUserModalController',
    function adminDeleteUserModalController($scope, $rootScope, $route, $modalInstance, userProfile, userID, errorsService) {
        $scope.username;
        $scope.userID = userID;

        /* get user by id */
        userProfile.adminGetUserById($scope.userID).then(function(data) {
            $scope.currentUser = data;
            $scope.username = data.userName;
        }, function(error) {
            errorsService.handleError(error);
        });

        /* confirm user deletion */
        $scope.ok = function() {
            $modalInstance.close();

            userProfile.adminDeleteUser($scope.username).then(function(data) {
                $route.reload();
                $rootScope.$broadcast('alertMessage', data.message);
            }, function(error) {
                errorsService.handleError(error);
            });
        };

        /* close modal dialog */
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    });