var onlineAdsAppControllers = onlineAdsAppControllers || angular.module('onlineAdsAppControllers', []);

onlineAdsAppControllers.controller('UserPiblishAdController',
    function($scope, adsData, townsData, categoriesData, authorizationService, ajaxErrorText) {
        $scope.nullValue = null;
        $scope.errorOccurred = false;
        $scope.publishingActive = true;
        $scope.alertMsg = '';
        $scope.alertType = '';

        $scope.closeAlert = function() {
            $scope.errorOccurred = false;
        };

        // load towns in dropdown select
        townsData.getAll().then(function(data) {
            $scope.townsData = data;
        }, function(error) {
            // $scope.alertMsg = ajaxErrorText;
        });

        // load cateogoreis in dropdown select
        categoriesData.getAll().then(function(data) {
            $scope.categoriesData = data;
        }, function(error) {
            // $scope.alertMsg = ajaxErrorText;
        });

        $scope.imageData = '';
        $scope.newAdData = {
            townId: null,
            categoryId: null
        };

        $scope.fileSelected = function(fileInputField) {
            delete $scope.newAdData.imageDataUrl;
             // $('.ad-image').attr('src', '');
             // $('.image-title').attr('value', '');
            var file = fileInputField.files[0];

            if (file.type.match(/image\/.*/)) {
                var reader = new FileReader();
                reader.onload = function() {
                    $scope.newAdData.imageDataUrl = reader.result;
                    $('.ad-image').attr('src', reader.result);
                    $('.image-title').attr('value', file.name);
                };
                reader.readAsDataURL(file);
            } else {
                $scope.newAdData.imageDataUrl = null;
                $('.ad-image').attr('src', './img/not-suported.jpg');
                $('.image-title').attr('value', 'file format not supported');
            }
        };

        $scope.publishAd = function(newAdData, newAdForm) {
            if (newAdForm.$valid && authorizationService.userIsLogged()) {
                adsData.publishAd(newAdData).then(function(data) {
                    $scope.errorOccurred = true;
                    $scope.publishingActive = false;
                    $scope.alertType = 'success';
                    $scope.alertMsg = 'Advertisement submitted for approval.Once approved, it will be published.';
                }, function(error) {
                    $scope.errorOccurred = true;
                    $scope.alertType = 'danger';
                    $scope.alertMsg = ajaxErrorText;
                });
            }
        };


    });