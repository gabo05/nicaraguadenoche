/**
 * EventController
 *
 * @description :: Server-side logic for managing suscriptions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function(req, res){
        var events, articles, images, suggesteds, gallery, categories;
		EventService.getComingSoon()
        .then(function(results){
            events = results;
            return ArticleService.getPublisheds(1);
        })
        .then(function (data) {
            articles = data;
            return GalleryService.getByDisplay('slide');
        })
        .then(function (data2) {
            images = data2;
            return PlaceService.getSuggesteds();
        })
        .then(function (data3) {
            suggesteds = data3;
            return GalleryService.getByDisplay('gallery');
        })
        .then(function (data4) {
            gallery = data4;
            return CategoryService.getByType('gallery');
        })
        .then(function (data5) {
            categories = data5;
            res.view('homepage', { categories: categories, gallery: gallery, suggesteds: suggesteds, events: events, articles: articles, images: images, 'layout':'homelayout' });
        })
        .catch(function(err){
            res.serverError(err);
        });
	}
};