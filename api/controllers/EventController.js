/**
 * EventController
 *
 * @description :: Server-side logic for managing suscriptions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	comingsoon: function(req, res){
		EventService.getComingSoon()
        .then(function(results){
            res.ok(results);
        })
        .catch(function(err){
            res.serverError(err);
        });
	},
	detail: function(req, res){
		EventService.getEventByPath(req.param('path'))
        .then(function(evt){
            res.view({event: evt });
        })
        .catch(function(err){
            res.serverError(err);
        });
	}
};