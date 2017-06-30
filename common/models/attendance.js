'use strict';
var moment = require('moment');

module.exports = function(Attendance) {
  Attendance.observe('before save', function updateDuration(ctx, next) {
    // console.log(ctx);
    if (ctx.instance) {
      var attendance = ctx.instance;
    } else {
      var attendance = ctx.data;
    }
    console.log(attendance);
    if (attendance.start && attendance.end) {
      if (moment(attendance.end).isSameOrBefore(attendance.start)) {
        var err = new Error("Ya gotta show up before you leave!");
        next(err);
      } else {
        var duration = moment(attendance.end).diff(attendance.start);
        attendance.updateAttribute('duration', duration, function(err, attendance){
            console.log(err);
            console.log(attendance);
            next();
        })
      }
    } else {
      next();
    }

  });
};
