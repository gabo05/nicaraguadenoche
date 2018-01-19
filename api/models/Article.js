/**
 * Article.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

	attributes: {
		title: {
			type: 'string',
			required: true
		},
		path: {
			type: 'string',
			required: true,
			unique: true
		},
		imageid: {
			type: 'string'
		},
		content: {
			type: 'text'
		},
		published: {
			type: 'boolean',
      		defaultsTo: true
		},
		created: {
			type: 'datetime'
		},
		author: {
			type: 'string'
		},
		userid: {
			type: 'string'
		},
		tags: {
			type: 'array',
			defaultsTo: []
		},
		shortdesc: {
			type: 'text',
			required: true
		},
		video: {
			type: 'string'
		}
	}
};

