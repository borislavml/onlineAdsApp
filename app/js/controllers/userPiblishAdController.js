var onlineAdsAppControllers = onlineAdsAppControllers || angular.module('onlineAdsAppControllers', []);

onlineAdsAppControllers.controller('UserPiblishAdController',
    function userPublishController($scope, $rootScope, $timeout, adsData, townsData, categoriesData,
     authorizationService, errorsService) {
        $scope.nullValue = null;
        $scope.imageData = '';
        $scope.newAdData = {
            townId: null,
            categoryId: null,
            imageDataUrl: null,
        };

        /* load towns in dropdown select */
        townsData.getAll().then(function(data) {
            $scope.townsData = data;
        }, function(error) {
            errorsService.handleError(error);
        });

        /* load cateogoreis in dropdown select */
        categoriesData.getAll().then(function(data) {
            $scope.categoriesData = data;
        }, function(error) {
            errorsService.handleError(error);
        });

        /* get uploaded image */
        $scope.fileSelected = function(fileInputField) {
            delete $scope.newAdData.imageDataUrl;
            var file = fileInputField.files[0];

            if (file.type.match(/image\/.*/)) {
                var reader = new FileReader();
                reader.onload = function() {
                    /* display uploaded image */
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
                /* set image data to null if no image has been uploaded*/
                if ($scope.newAdForm.imageDataUrl == './img/no.image-uploaded-mini.jpg') {
                    $scope.newAdForm.imageDataUrl = null;
                };

                adsData.publishAd(newAdData).then(function(data) {
                    $rootScope.$broadcast('alertMessage', 'Advertisement submitted for approval.Once approved, it will be published.');

                    /* clean publish ad form */
                    $('.ad-image').attr('src', './img/no.image-uploaded-mini.jpg');
                    $('.image-title').attr('value', '');
                    $('#title').val('');
                    $('#text').val('');
                    $('#selectTown').val($scope.nullValue);
                    $('#selectCategory').val($scope.nullValue);
                }, function(error) {
                    errorsService.handleError(error);
                });
            }
        };

        /* delete current image */
        $scope.deleteImage = function() {
            delete $scope.newAdData.imageDataUrl;
            $('.ad-image').attr('src', './img/no.image-uploaded-mini.jpg');
            $('.image-title').attr('value', '');
            $scope.newAdData.imageDataUrl = null;
            $scope.newAdForm.imageDataUrl = null;
        };
    });