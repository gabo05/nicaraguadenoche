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
			Place.native(function (err, Collection){
			    Collection.update({"_id": splace._id}, {"$set": splace}, {"upsert": true}, function (err, updated){
			        resolve(updated);
			    })
			});
		});
	},
	actDeact: function(id, actdect){
		return new Promise(function(resolve, reject){
			Place.native(function (err, Collection){
			    Collection.update({"_id": id}, {"$set": {active: actdect}}, {"upsert": true}, function (err, updated){
			        resolve(updated);
			    })
			});
		});
	}
}