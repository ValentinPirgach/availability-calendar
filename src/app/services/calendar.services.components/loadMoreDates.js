export default function loadMoreDates (dates, lines, direction, callback) {
  if(direction && direction === 'prev' ) {
    if(dates[0].date.year() === 2016 && dates[0].date.month() < 2) return;

    console.log(dates[0].date.year(), 2016 && dates[0].date.month());

    this._prevLoaded = moment(dates[0].date);
    let count = 30;

    for(let i = 0; i <= count; i++) {
      let date = moment(this._prevLoaded).subtract(i + 1, 'day').startOf('day');

      dates.unshift({
        date: date,
        weekend: this.isWeekend(date),
        current: moment().isSame(date, 'd'),
        opened: {
          start: false,
          end: false
        }
      });
    }

    let start = dates[0].date;
    let dow = start.day();

    for(let i = 0; i < dow; i++) {
      let date = moment(start).subtract(i + 1, 'day').startOf('day');

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

    if(callback) callback();

    this.renderPrices();
    this.renderAvailabilities();
    this.lines = lines = _.chunk(dates, 7);
    this.dates = dates;

    return {
      dates: this.dates,
      lines: this.lines
    };
  } else {
    if(this._lastLoaded.isSameOrBefore(this._maxDate)) {
      this._lastLoaded.add(1, 'M');

      let count = new Date(this._lastLoaded.year(), this._lastLoaded.month() + 1, 0).getDate();

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

      if(callback) callback();

      this.renderPrices();
      this.renderAvailabilities();
      this.lines = lines = _.chunk(dates, 7);
      this.dates = dates;

      return {
        dates: this.dates,
        lines: this.lines
      };
    }
  }
}
