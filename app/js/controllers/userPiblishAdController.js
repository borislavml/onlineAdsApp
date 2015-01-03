var onlineAdsAppControllers = onlineAdsAppControllers || angular.module('onlineAdsAppControllers', []);

onlineAdsAppControllers.controller('UserPiblishAdController',
    function($scope, adsData, townsData, categoriesData) {
        var ajaxErrorText = 'Something went wrong, please try again or refresh the page.';

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

        $scope.fileSelected = function(fileInputField, newAdForm) {
            // delete $scope.adData.imageDataUrl;
            delete $scope.newAdData.imageDataUrl;
            var file = fileInputField.files[0];
            if (file.type.match(/image\/.*/)) {
                var reader = new FileReader();
                reader.onload = function() {
                    $scope.fileName = file.name;
                    $scope.newAdData.imageDataUrl = reader.result;
                    $scope.imageData = reader.result;
                };
                reader.readAsDataURL(file);
            } else {
                $scope.imageData = './img/not-suported.jpg';
            }
        };

        $scope.publishAd = function(newAdData, newAdForm) {
            if (newAdForm.$valid) {
                adsData.publishAd(newAdData).then(function(data) {
                    $scope.errorOccurred = true;
                    $scope.publishingActive = false;
                    $scope.alertType = 'success';
                    $scope.alertMsg = 'Advertisement submitted for approval. Once approved, it will be published.';
                }, function(error) {
                    $scope.errorOccurred = true;
                    $scope.alertType = 'success';
                    $scope.alertMsg = ajaxErrorText;
                });
            }
        };


    });