var moment = require('moment');
var mSeconds = 1000;
var mMinutes = mSeconds * 60;
var mHours = mMinutes * 60;
var mDays = mHours * 24;
var getNicDatetime = function(){
	var current = new Date();
	var utc = new Date(current.getUTCFullYear(), current.getUTCMonth(), current.getUTCDate(), current.getUTCHours(), current.getUTCMinutes(), current.getUTCSeconds());
	var nic = new Date(utc.getUTCFullYear(), utc.getUTCMonth(), utc.getUTCDate(), utc.getUTCHours()-6, utc.getUTCMinutes(), utc.getUTCSeconds());
	return nic;
};
// api/services/TimeService.js
module.exports = {
	getNicDatetime: getNicDatetime,
	formatDate: function(date){
		return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
	},
	getUntil: function(date){
		var current = getNicDatetime();

		var diff = date.valueOf() - current.valueOf();

		var oDiff = {};

		oDiff.days = Math.floor(diff / mDays);

		oDiff.hours = Math.floor((diff % mDays) / mHours);

		oDiff.minutes = Math.floor((diff % mHours) / mMinutes);

		oDiff.seconds = Math.floor((diff % mMinutes) / mSeconds);

		return oDiff;
	}
}