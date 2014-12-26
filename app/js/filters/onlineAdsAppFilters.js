/* Filters */

angular.module('onlineAdsAppFilters', []).filter('trusted', ['$sce',
    function($scvideoFilterse) {
        return function(url) {
            return $sce.trustAsResourceUrl(url);
        };
    }
])
.filter('checkmark', function(){
	return function(input){
		return input ? '\u2713' : '\u2718';
	};
});


