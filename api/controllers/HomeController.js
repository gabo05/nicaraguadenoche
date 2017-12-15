/**
 * EventController
 *
 * @description :: Server-side logic for managing suscriptions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function(req, res){
		EventService.getComingSoon()
        .then(function(results){
            res.view('homepage', { events: results, 'layout':'homelayout' });
        })
        .catch(function(err){
            res.serverError(err);
        });
	}
};