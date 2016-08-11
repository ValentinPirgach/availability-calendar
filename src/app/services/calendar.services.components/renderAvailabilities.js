if(!process.env.production) {
  var _ = require('lodash');
  var moment = require('moment/moment.js');
}

/**
 * Viewing car availability
 **/
export default function renderAvailabilities  () {
  _.forEach(this.dates, (date) => {
    _.forEach(this.availabilities, (avail) => {
      let day_availability = {};

      if (date.date.isBetween(moment(avail.startDateNy), moment(avail.endDateNy))) {
        _.assign(day_availability, {busy: true});
      }

      if (date.date.isSame(moment(avail.startDateNy), 'day')) {
        _.assign(day_availability, {
          busy: true,
          _first: moment(avail.startDateNy)
        });
      }

      if (date.date.isSame(moment(avail.endDateNy), 'day')) {
        _.assign(day_availability, {
          busy: true,
          _last: moment(avail.endDateNy)
        });
      }

      if(!date.availability) {
        _.assign(date, {availability: []});
      }

      if(!_.isEmpty(day_availability)) {
        date.availability.push(day_availability);
      }
    });
  });

  if(!_.isEmpty(this.selectedPeriod) && this.selectedPeriod.dateStart && this.selectedPeriod.dateEnd) {
    this.renderSelected();
  }
}
