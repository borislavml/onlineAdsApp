onlineAdsApp.controller('UserEditAdModalController',
    function userEditAdModalController($scope, $rootScope, $modalInstance, $route, adsData, errorsService, 
     categoriesData, townsData, id) {
        $scope.id = id;

        /* get selected ad */
        adsData.getAdById(id).then(function(data) {
            $scope.currentAd = data;
            $scope.editAdForm = {
                title: data.title,
                text: data.text,
                imageDataUrl: data.imageDataUrl ? data.imageDataUrl : './img/no.image-uploaded-mini.jpg',
                categoryId: data.categoryId ? data.categoryId : null,
                townId: data.townId ? data.townId : null,
                changeImage: false,
            };
        }, function(error) {
            errorsService.handleError(error);
        });


        /* get towns for dropdown */
        townsData.getAll().then(function(data) {
            $scope.townsData = data;
        }, function(error) {
            errorsService.handleError(error);
        });

        /* get categories for dropdown */
        categoriesData.getAll().then(function(data) {
            $scope.categoriesData = data;
        }, function(error) {
            errorsService.handleError(error);
        });

        /* get uploaded image */
        $scope.fileSelected = function(fileInputField) {
            delete $scope.editAdForm.imageDataUrl;
            var file = fileInputField.files[0];

            if (file.type.match(/image\/.*/)) {
                var reader = new FileReader();
                reader.onload = function() {
                    /* display uploaded image */
                    $scope.editAdForm.imageDataUrl = reader.result;
                    $('.ad-image').attr('src', reader.result);
                    $('.image-title').attr('value', file.name);
                    $scope.editAdForm.changeImage = true;
                    $scope.editAdForm.imageDataUrl = reader.result;
                };
                reader.readAsDataURL(file);
            } else {
                $('.ad-image').attr('src', './img/not-suported.jpg');
                $('.image-title').attr('value', 'file format not supported');
                $scope.editAdForm.changeImage = true;
                $scope.editAdForm.imageDataUrl = null;
            }
        };

        /* delete current image */
        $scope.deleteImage = function() {
            delete $scope.editAdForm.imageDataUrl;
            $('.ad-image').attr('src', './img/no.image-uploaded-mini.jpg');
            $('.image-title').attr('value', '');
            $scope.editAdForm.changeImage = true;
            $scope.editAdForm.imageDataUrl = null;
        };

        /* confirm ad edit */
        $scope.ok = function(id, editAdForm) {
            if (!editAdForm.title || !editAdForm.text) {
                return;
            }

            /* set image data to null if no image has been uploaded*/
            if (editAdForm.imageDataUrl == './img/no.image-uploaded-mini.jpg') {
                editAdForm.imageDataUrl = null;
            }

            adsData.editAd(id, editAdForm).then(function(data) {
                $modalInstance.close();
                $route.reload();
                $rootScope.$broadcast('alertMessage', data.message +
                    "Don't forget to submit it for publishing.");
            }, function(error) {
                $modalInstance.close();
                $route.reload();
                errorsService.handleError(error);
            });
        };

        /* close modal dialog */
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
            $route.reload();
        };
    });