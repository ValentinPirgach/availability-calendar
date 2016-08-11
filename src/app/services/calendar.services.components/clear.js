if(!process.env.production) {
  var _ = require('lodash');
  var moment = require('moment/moment.js');
}

export default function clear (date) {
  return _.assign(date, {
    selected: false,
    busy:     false,
    unbroken: false,
    opened: {
      first:  false,
      last:   false
    },
    _first:   false,
    _last:    false,
  });
}
