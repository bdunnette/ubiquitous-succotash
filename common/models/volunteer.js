'use strict';
var moment = require('moment');

module.exports = function(Volunteer) {
  var app = require('../../server/server');
  Volunteer.signIn = function(workAreaId, id, cb) {
    Volunteer.findById(id, function(err, volunteer){
      console.log(volunteer);
      // From http://loopback.io/doc/en/lb3/HasMany-relations.html#methods-added-to-the-model
      volunteer.attendances.create({workAreaId: workAreaId}, function(attendance){
        console.log(attendance);
        cb(null, attendance);
      });
    });
  }

  Volunteer.remoteMethod('signIn', {
    accepts: [{
      arg: 'workArea',
      type: 'string'
    }, {
      arg: 'id',
      type: 'string'
    }],
    returns: {
      arg: 'attendance',
      type: 'object'
    }
  });

  Volunteer.signOut = function(id, cb) {
    Volunteer.findById(id, function(err, volunteer){
      // From http://loopback.io/doc/en/lb3/HasMany-relations.html#methods-added-to-the-model
      volunteer.attendances.findOne({order:'start DESC'}, function(err, attendance){
        if (err) {
          cb(err, null);
        } else if (attendance) {
          console.log(attendance);
          var attendanceEnd = new Date();
          var duration = moment(attendance.end).diff(attendance.start);
          attendance.updateAttributes({end: attendanceEnd, duration: duration}, function(err,attendance){
            console.log(attendance);
            cb(null, attendance);
          });
        } else {
          cb(`No attendances found for volunteer #${volunteer.id}`, null);
        }
      });
    });
  }

  Volunteer.remoteMethod('signOut', {
    accepts: [{
      arg: 'id',
      type: 'string',
      required: true
    }],
    returns: {
      arg: 'attendance',
      type: 'object'
    }
  });
};
