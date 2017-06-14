'use strict';
var moment = require('moment');

function getDuration(start, end) {
  return moment(end).diff(start);
}

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
      console.log(moment(attendance.end).isSameOrBefore(attendance.start));
      if (moment(attendance.end).isSameOrBefore(attendance.start)) {
        var err = new Error("Ya gotta show up before you leave!");
        next(err);
      } else {
        attendance.duration = moment(attendance.end).diff(attendance.start);
        console.log(attendance.duration);
        console.log(moment.duration(attendance.duration, 'ms').humanize());
        next();
      }
    } else {
      next();
    }

  });
};
