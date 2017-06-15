'use strict';

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
};
