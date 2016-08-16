/**
 * Rendering selected items on calendar
 **/
export default function renderSelected (period) {
  this.selectedDates = [];
  if(arguments.length) {
    this.selectedPeriod = period;
  }

  if(!this.selectedPeriod.dateStart || !this.selectedPeriod.dateEnd) return false;

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

  _.first(this.selectedDates)._first = this.selectedPeriod.dateStart;
  _.last(this.selectedDates)._last = this.selectedPeriod.dateEnd;

  //TODO: need realization without events
  this.$rootScope.$broadcast('calendar.datesHasBeenSelected', this.selectedPeriod);
  return this.selectedDates;
}
