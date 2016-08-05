import _ from 'lodash/lodash.js';
import moment from 'moment/moment.js';

export default class CalendarCtrl {
  constructor(CalendarService) {
    this.dates = [];
    CalendarService.setDates(this.days);

    this.days = CalendarService.getDayNames();
    let dates = CalendarService.generateDates();
    this.dates = CalendarService.loadMoreDates(dates);
    this.selectedDates = [];

    CalendarService.getPrices();
    CalendarService.getAvailabilities();
  }

  getDate (_moment_) {
    return _moment_.date();
  }

  getMonth (_moment_) {
    return _moment_.format('MMM');
  }

  selectDate (date) {
    for(let i in this.selectedDates) {
      if(date.date.isSame(this.selectedDates[i].date)) {
        delete this.selectedDates[i].opened;
        this.selectedDates = [];
        return;
      }
    }

    if(this.selectedDates.length === 1) {
      _.forEach(this.selectedDates, (date) => {
        delete date.opened;
      });
      this.selectedDates = [];
    }

    this.selectedDates.push(_.assign(date, {opened: true}));
  }

  specificPriceClasses (date) {
    return {
      first: date.specificPrice._first,
      last: date.specificPrice._last,
      unbroken: date.specificPrice.unbroken
    };
  }

  availCell (cell) {
		//same day
		if(cell._first && cell._last) {
			let width = moment(cell._last).diff(cell._first, 'h') * 100 / 24;
			let left = moment(cell._first).hour() * 100 / 24;

			return {width: `${width}%`, left: `${left}%`};
		}

		if(cell._first)
			return {width: `${100 - moment(cell._first).hour() * 100 / 24}%`, right: 0};

		if(cell._last)
			return {width: `${moment(cell._last).hour() * 100 / 24}%`, left: 0};

		return {width: `100%`};
	}
}
