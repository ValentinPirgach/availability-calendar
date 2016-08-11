if(!process.env.production) {
  var _ = require('lodash');
  var moment = require('moment/moment.js');
}
/**
 * Rendering selected items on calendar
 **/
export default function renderSelected (period) {
  this.selectedDates = [];
  if(arguments.length) {
    this.selectedPeriod = period;
  }

  let setSelected = (date) => {
    let checkAvailability = this.checkAvailability(date, this.selectedPeriod);
    let checkIsInUnbroken = this.isInUnbroken(this.selectedPeriod);

    this.selectedDates.push(_.assign(date, {
      selected: true,
      busy: checkAvailability || checkIsInUnbroken
    }));
   };

  for (var i in this.dates) {
    if(arguments.length)
      this.clear(this.dates[i]);

    if (this.dates[i].date.isBetween(this.selectedPeriod.dateStart, this.selectedPeriod.dateEnd, 'day', '()')) {
      setSelected(this.dates[i]);
    }

    if (this.dates[i].date.isSame(this.selectedPeriod.dateStart, 'day')) {
      setSelected(this.dates[i]);
    }

    if (this.dates[i].date.isSame(this.selectedPeriod.dateEnd, 'day')) {
      setSelected(this.dates[i]);
    }
  }

  this.checkForErrors(this.selectedPeriod);

  _.first(this.selectedDates)._first = this.selectedPeriod.dateStart;
  _.last(this.selectedDates)._last = this.selectedPeriod.dateEnd;

  return this.selectedDates;
}
