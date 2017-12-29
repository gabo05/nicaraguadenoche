var ObjectId = require('mongodb').ObjectID;
// api/services/EventService.js
module.exports = {

    /**
    * Get the five next events.
    *
    */
    getComingSoon: function (options, done) {
        return new Promise(function(resolve, reject){
            Event.native(function(err, collection) {
                if (err) return reject(err);
                var nicTime = TimeService.getNicDatetime();
                collection.aggregate([
                {
                    $match: { 
                        start_date: { $gte: nicTime },
                        active: true
                    }
                },
                {
                    $sort: {start_date: 1}
                },
                {
                    $limit: 5
                }]).toArray(function (err, results) {
                    if (err) return reject(err);
                    return resolve(results);
                });
            });
        });
    },
    /**
    * Get the event detail by path.
    * @required {String} path
    *   The path of the event.
    */
    getEventByPath: function(path){
        return new Promise(function(resolve, reject){
            Event.findOne({path: path})
            .exec(function (err, event) {
                if (err) return reject(err);
                return resolve(event);
            });
        });
    },
    getAll: function(){
		return new Promise(function(resolve, reject){
			Event.find()
			.exec(function (err, events){
				if(err) return reject(err);
				
				return resolve(events);
			});
		});
	},
	getActives: function(){
		return new Promise(function(resolve, reject){
			Event.find({active: true})
			.exec(function (err, events){
				if(err) return reject(err);
				
				return resolve(events);
			});
		});
	},
	save: function(sevent){
        if(!sevent.path || sevent.path === ''){
            sevent.path = StringService.toPath(sevent.title);
        }
        sevent.active = true;
        sevent.start_date = TimeService.toDate(sevent.start_date);
        sevent.end_date = TimeService.toDate(sevent.end_date);
		return new Promise(function(resolve, reject){
			Event.native(function (err, Collection){
			    Collection.update({"path": sevent.path}, {"$set": sevent}, {"upsert": true}, function (err, updated){
			        resolve(sevent);
			    })
			});
		});
	},
	actDeact: function(id, actdect){
		return new Promise(function(resolve, reject){
			Event.native(function (err, Collection){
			    Collection.update({"_id": new ObjectId(id)}, {"$set": {active: actdect}}, {"upsert": true}, function (err, updated){
			        resolve(updated);
			    })
			});
		});
	}
};