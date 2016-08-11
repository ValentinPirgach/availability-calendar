if(!process.env.production) {
  var _ = require('lodash');
  var moment = require('moment/moment.js');
}

export default function clearData () {
  _.forEach(this.dates, (date) => {
    date.availability = [];
    date.price = null;
    date.specificPrice = null;
  });
}
