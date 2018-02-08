var ObjectId = require('mongodb').ObjectID;

// api/services/PlaceService.js
module.exports = {
	getAll: function(){
		return new Promise(function(resolve, reject){
			Place.find()
			.exec(function (err, places){
				if(err) return reject(err);
				
				return resolve(places);
			});
		});
	},
	getActives: function(){
		return new Promise(function(resolve, reject){
			Place.find({active: true})
			.exec(function (err, places){
				if(err) return reject(err);
				
				return resolve(places);
			});
		});
	},
	save: function(splace){
		return new Promise(function(resolve, reject){
			if(!splace.path || splace.path === ''){
				splace.path = StringService.toPath(splace.name);
			}
			splace.active = true;
			Place.native(function (err, Collection){
			    Collection.update({"path": splace.path}, {"$set": splace}, {"upsert": true}, function (err, updated){
			        resolve(splace);
			    })
			});
		});
	},
	actDeact: function(id, actdect){
		return new Promise(function(resolve, reject){
			Place.native(function (err, Collection){
			    Collection.update({"_id": new ObjectId(id)}, {"$set": {active: actdect}}, {"upsert": true}, function (err, updated){
			        resolve(updated);
			    })
			});
		});
	},
	/**
    * Get the event detail by path.
    * @required {String} path
    *   The path of the event.
    */
    getByPath: function(path){
        return new Promise(function(resolve, reject){
            Place.findOne({path: path})
            .exec(function (err, place) {
                if (err) return reject(err);
                return resolve(place);
            });
        });
    },
    updateImage: function (path, imageid) {
        return new Promise(function (resolve, reject) {
            Place.native(function (err, collection) {
                if(err) reject(err);

                collection.update({path: path}, {$set: { imageid: imageid }}, {"upsert": true}, function (err, updated){
			        resolve(updated);
			    });
            });
        });
	},
	getSuggesteds: function () {
		return new Promise(function (resolve, reject) {
			Place.native(function (err, collection) {
				if(err) reject(err);

				collection.aggregate([{
					$limit: 4
				}]).toArray(function (err, results) {
                    if (err) return reject(err);
                    return resolve(results);
                });
			});
		});
	}
}