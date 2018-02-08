module.exports = {
    save: function (cat) {
        return new Promise(function(resolve, reject){
			Category.native(function (err, Collection){
			    Collection.update({"keyname": cat.keyname}, {"$set": cat}, {"upsert": true}, function (err, updated){
                    if(err) reject(err);
                    resolve(cat);
			    })
			});
		});
    },
    getByType: function (type) {
        return new Promise(function(resolve, reject){
			Category.native(function(err, collection) {
                if (err) return reject(err);
                collection.find({
                	type:  type
                }).toArray(function (err, results) {
                    if (err) return reject(err);
                    return resolve(results);
                });
            });
		});
    },
    getByKeyname: function (key) {
        return new Promise(function(resolve, reject){
			Category.native(function(err, collection) {
                if (err) return reject(err);
                collection.find({
                	keyname:  key
                }).toArray(function (err, results) {
                    if (err) return reject(err);
                    return resolve(results[0]);
                });
            });
		});
    },
    getAll: function () {
        return new Promise(function(resolve, reject){
			Category.native(function(err, collection) {
                if (err) return reject(err);
                collection.find({
                }).toArray(function (err, results) {
                    if (err) return reject(err);
                    return resolve(results);
                });
            });
		});
    }
}