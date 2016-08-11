if(!process.env.production) {
  var _ = require('lodash');
  var moment = require('moment/moment.js');
}

export default function loadMoreDates (dates) {
  if(this._lastLoaded.isSameOrBefore(this._maxDate)) {
    this._lastLoaded.add(1, 'M');

    var count = new Date(this._lastLoaded.year(), this._lastLoaded.month() + 1, 0).getDate();

    for (let i = 1; i <= count; i++) {
      let date = moment({d: i, M: this._lastLoaded.month(), Y: this._lastLoaded.year()});
      dates.push({
        date: date,
        weekend: this.isWeekend(date),
        current: moment().isSame(date, 'd'),
        opened: {
          start: false,
          end: false
        }
      });
    }
  }

  this.renderPrices();

  return _.assign(this.dates, dates);
}
