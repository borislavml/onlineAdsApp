/* Serrvice for getting ads data fromt the server  */
onlineAdsApp.factory('adsData', function adsData($resource) {
    var resource = $resource(
        'http://localhost:1337/api/ads', {
            id: '@id'
        }, {
            update: {
                method: 'PUT'
            }
        });

    function getAllAds() {
        return resource.get();
    }

    function createNewAd(ad) {
        return resource.save(ad);
    }

    function getAdById(id) {
        return resource.get({
            id: id
        });
    }

    function editAd(id, ad) {
        return resource.update({
            id: id
        }, ad);
    }

    function deleteAd(id) {
        return resource.delete({
            id: id
        });
    }

    return {
        getAll: getAllAds,
        create: createNewAd,
        getById: getAdById,
        edit: editAd,
        delete: deleteAd
    };
});