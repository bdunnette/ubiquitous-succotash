'use strict';

module.exports = function(Volunteer) {
  var app = require('../../server/server');
  Volunteer.signIn = function(task, id, cb) {
    console.log(task);
    console.log(id);
    var Attendance = app.models.Attendance;
    Attendance.create({
      task: task,
      volunteerId: id
    }).then(function(attendance) {
      console.log(attendance);
      cb(null, attendance);
    });
  }

  Volunteer.remoteMethod('signIn', {
    accepts: [{
      arg: 'task',
      type: 'string'
    }, {
      arg: 'id',
      type: 'string'
    }],
    returns: {
      arg: 'greeting',
      type: 'object'
    }
  });
};
