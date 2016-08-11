import moment from 'moment';

/**
 * Creating calendar dates
 **/
export default function generateDates (_moment_) {
  _moment_ = _moment_ || moment();

  var count = new Date(_moment_.year(), _moment_.month() + 1, 0).getDate(),
      dates = [];

  for (let i = 1; i <= count; i++) {
    let date = moment({d: i, M: _moment_.month(), Y: _moment_.year()}).startOf('day');
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

  let dow = moment(this._lastLoaded).date(1).day();
  for(let i = 0; i < dow; i++) {
    let date = moment(this._lastLoaded).date(1).subtract(i+1, 'day').startOf('day');
    dates.unshift({
      date: date,
      weekend: this.isWeekend(date),
      prevMonth: true,
      opened: {
        start: false,
        end: false
      }
    });
  }

  this._lastLoaded = _moment_.startOf('month');

  return dates;
}
