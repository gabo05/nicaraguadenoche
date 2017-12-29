var ObjectId = require('mongodb').ObjectID;

module.exports = {
	save: function(art){
		return new Promise(function(resolve, reject){
			if(!art.path || art.path === ''){
				art.path = StringService.toPath(art.title);
			}
			art.published = false;
			art.created = TimeService.getNicDatetime();

			Article.native(function (err, Collection){
			    Collection.update({"path": art.path}, {"$set": art}, {"upsert": true}, function (err, updated){
			    	if(err) return reject(err);
			        
			        return resolve({updated: updated, path: art.path});
			    });
			});
		});
	},
	getByPath: function(path){
		return new Promise(function(resolve, reject){
            Article.findOne({path: path})
            .exec(function (err, art) {
                if (err) return reject(err);
                return resolve(art);
            });
        });
	},
	getPublisheds: function(){
		return new Promise(function(resolve, reject){
			Article.find({published: true})
			.exec(function (err, articles){
				if(err) return reject(err);
				
				return resolve(articles);
			});
		});
	},
	getAll: function(){
		return new Promise(function(resolve, reject){
			Article.find()
			.exec(function (err, articles){
				if(err) return reject(err);
				
				return resolve(articles);
			});
		});
	},
	pubUnpub: function(id, pubunpub){
		return new Promise(function(resolve, reject){
			Place.native(function (err, Collection){
			    Collection.update({"_id": new ObjectId(id)}, {"$set": {active: pubunpub}}, {"upsert": true}, function (err, updated){
			    	if(err) return reject(err);
			        
			        return resolve(updated);
			    })
			});
		});
	}
};