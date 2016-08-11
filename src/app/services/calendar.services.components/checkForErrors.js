if(!process.env.production) {
  var _ = require('lodash');
  var moment = require('moment/moment.js');
}

export default function checkForErrors (period) {
  this.errors = {};

  if(this.checkAllAvailabilities(period)) {
    _.assign(this.errors, {unavailableDates: true});
  }

  if(this.isInUnbroken(period)) {
    _.assign(this.errors, {unbrokenPrice: true});
  }

  return this.errors;
}
