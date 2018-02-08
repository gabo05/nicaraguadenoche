/**
 * AdminController
 *
 * @description :: Server-side logic for managing suscriptions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	home: function(req, res){
		return res.view('admin/home', { 'layout':'adminlayout' });
	},
	places: function(req, res){
		return res.view('admin/places', { 'layout':'adminlayout' });
	},
	events: function(req, res){
		return res.view('admin/events', { 'layout':'adminlayout' });
	},
	articles: function(req, res){
		return res.view('admin/articles', { 'layout':'adminlayout' });
	},
	gallery: function(req, res){
		return res.view('admin/gallery', { 'layout':'adminlayout' });
	},
	categories: function(req, res){
		return res.view('admin/categories', { 'layout':'adminlayout' });
	},
	search: function(req, res){
		return res.view('admin/search', { 'layout':'adminlayout' });
	}
};