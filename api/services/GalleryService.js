var ObjectId = require('mongodb').ObjectID;
module.exports = {
    save: function (image) {
        delete image._id;
        if(image.place) image.place = new ObjectId(image.place);
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
    },
    getByPlace: function (pid) {
        return new Promise(function(resolve, reject){
			Gallery.native(function(err, collection) {
                if (err) return reject(err);
                collection.find({
                    place:  new ObjectId(pid),
                    type: 'img'
                }).toArray(function (err, results) {
                    if (err) return reject(err);
                    return resolve(results);
                });
            });
		});
    },
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
    },
    delete: function (id) {
        return new Promise(function (resolve, reject) {
            Gallery.native(function(err, collection) {
                if (err) return reject(err);
                collection.remove({_id: new ObjectId(id)});
                resolve({status: 'ok'});
            });
        });
    }
};