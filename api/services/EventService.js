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
                        start_date: { $gte: nicTime }
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
    }
};