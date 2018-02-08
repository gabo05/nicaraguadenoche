var ObjectId = require('mongodb').ObjectID;
module.exports = {
    save: function (image) {
        delete image._id;
        return new Promise(function(resolve, reject){
			Gallery.native(function (err, Collection){
			    Collection.update({"gid": image.gid}, {"$set": image}, {"upsert": true}, function (err, updated){
			        resolve(image);
			    })
			});
		});
    },
    getByDisplay: function (type) {
        return new Promise(function(resolve, reject){
			Gallery.native(function(err, collection) {
                if (err) return reject(err);
                collection.find({
                	display:  type
                }).toArray(function (err, results) {
                    if (err) return reject(err);
                    return resolve(results);
                });
            });
		});
    }
    ,
    getAll: function (type) {
        return new Promise(function(resolve, reject){
			Gallery.native(function(err, collection) {
                if (err) return reject(err);
                collection.find({
                }).toArray(function (err, results) {
                    if (err) return reject(err);
                    return resolve(results);
                });
            });
		});
    }
};