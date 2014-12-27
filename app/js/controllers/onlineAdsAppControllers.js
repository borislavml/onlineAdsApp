/* Controllers */

var onlineAdsAppControllers = angular.module('onlineAdsAppControllers', []);

onlineAdsAppControllers.controller('AdsController',
    function AdsController($scope, $http, adsData, categoriesData, townsData) {
        
        //$http.defaults.headers.common['Authorization'] = 'Bearer ih2sRaLmsnexuCgHDxuy_Z81cZgeMgcftuAWmRplQ2eISXIYf14le4P0Gr25CDNUoG7vvtZp42Bx64znic_A-577IYkhUv_8ybYb7KXFG2uYP9BSLzSuRG5REo6ivg6Jv7_iGU86MOywcYmm25y1gvHsd5PCwp5L28JKtN3CQ-iX2WnuMnjA0sTDh-i2aWA9-dEYjmxv7ITJth1ncBIxDDcO512Q98p7bXjayAdzaQLyntAQTI2VpEOgtHF36sSkKea7QDbOPHKY3JsKZxeVNdq-LMTiIopLiJLUc1SjmweFvj8O73P6lNskUxtisFJdE2BtiPnOjEsO7mdNhWpML-sgQRX3KDQLUwVfjQ5CBk_s15q3Ab21y2uZ_Is4DQNPnoxVWqWG2qby5v-MBB8dBrmgYsJPxZ5PxhuFWx_b0a-GK4lVbfhIRMPxDiaYQJUl_ts_S5Tba5v-bQQ-2CzYA8RM4wpppzqRpapEJ6d2ICo';
       
       /* Object for filtering ads by town and cateogry */
        $scope.filters = { };
        
        adsData.getAll().$promise.then(function(resp) {
            $scope.adsData = resp;
        }, function(errResp) {
            console.log(errResp);
        });

        categoriesData.getAll(function(data, status, headers, config) {
                $scope.categoriesData = data;
            },
            function(error, status, headers, config) {
                console.log(status, error); 
            });

        townsData.getAll(function(data, status, headers, config) {
                $scope.townsData = data;
            },
            function(error, status, headers, config) {
                console.log(status, error); 
            });

         

        // $scope.data = adsData.getById(6);

        // $scope.data = adsData.delete(68);

        // $scope.data = adsData.getById(68);

        // adsData.edit(70, { title: 'Dell Inspiron', text: 'Good laptop' });

        // adsData.create({ title: 'Peugeot 2014', text: 'The car is perfect'});
    });



// videoAppControllers.controller('videoController', ['$scope', '$http',
//     function($scope, $http) {
//         $http.get('videos/videos.json')
//             .success(function(data) {
//                 $scope.videos = data;
//             });

//         $scope.orderProp = 'title';

//         $scope.upVote = function(comment) {
//             comment.likes++;
//         };

//         $scope.downVote = function(comment) {
//             if (comment.likes > 0) {
//                 comment.likes--;
//             }
//         };
//     }
// ]);

// videoAppControllers.controller('newVideoController', ['$scope', '$http',
//     function($scope, $http) {
//         $scope.newVideo = {
//             title: '',
//             videoUrl: '',
//             category: '',
//             length: 0,
//             subscribers: 0,
//             date: new Date().toDateString(),
//             haveSubtitles: false,
//             comments: []
//         };

//         var newData = $scope.newVideo;

//         $scope.addVideoEvent = function() {
//             // get data from videos.json
//             $http.get('videos/videos.json')
//                 .success(function(data) {
//                     // push new video data to object and stringify it
//                     data.push(newData);
//                     var newObj = JSON.stringify(data);
//                     //post new JSON object file to videos directory
//                     $http.post('videos/videos', newObj)
//                         .success(function(data) {
//                            window.location.href = "#/videos";
//                         });
//                 });
//         };
//     }
// ]);