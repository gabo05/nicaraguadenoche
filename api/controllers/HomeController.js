/**
 * EventController
 *
 * @description :: Server-side logic for managing suscriptions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function(req, res){
        var events, articles, images;
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
            res.view('homepage', { events: events, articles: articles, images: images, 'layout':'homelayout' });
        })
        .catch(function(err){
            res.serverError(err);
        });
	}
};