/**
 * SearchController
 *
 * @description :: Server-side logic for managing search
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	questions: function(req, res){
		SearchService.getQuestions()
        .then(function(results){
            res.ok(results);
        })
        .catch(function(err){
            res.serverError(err);
        });
	},
    search: function(req, res){
        SearchService.search()
        .then(function(results){
            res.ok(results);
        })
        .catch(function(err){
            res.serverError(err);
        });
    }
};