/**
 * Event.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	title:{
  		type: 'string',
  		required: true
  	},
  	path:{
  		type: 'string',
  		required: true,
  		unique: true
  	},
  	start_date: {
  		type: 'datetime',
  		required: true
  	},
  	end_date: {
  		type: 'datetime',
  		required: true
  	},
  	description: {
  		type: 'text',
  		required: true
  	},
  	location: {
  		type: 'json',
  		attributes:{
  			name:{
  				type: 'string',
  				required: true
  			},
  			latitude: {
  				type: 'float'
  			},
  			longitude: {
  				type: 'float'
  			}
  		}
  	}
  }
};

