export default class CalendarCtrl {
  constructor(CalendarService) {
    CalendarService.setDefault();

    this.dates = [];
    CalendarService.setDates(this.days);
    this.days = CalendarService.getDayNames();
    let dates = CalendarService.generateDates();
    let data = CalendarService.loadMoreDates(dates);
    this.dates = data.dates;
    this.lines = data.lines;
    this.selectedDates = [];
    this.CalendarService = CalendarService;
  }

  chunk (list) {
    return _.chunk(list, 7);
  }

  getDate (_moment_) {
    return _moment_.date();
  }

  getMonth (_moment_) {
    return _moment_.format('MMMM');
  }

  getYear (_moment_) {
    return _moment_.format('YYYY');
  }

  specificPriceClasses (date) {
    return {
      first: date.specificPrice._first,
      last: date.specificPrice._last,
      unbroken: date.specificPrice.unbroken
    };
  }

  isPast (date) {
    return moment(date.date).startOf('day').isBefore(moment().startOf('day'));
  }

  cellStyle (cell) {
		//same day
		if(cell._first && cell._last) {
			let width = cell._last.diff(cell._first, 'm') * 100 / 1440;
			let left = cell._first.diff(cell._first.clone().startOf('day'), 'm') * 100 / 1440;
			return {width: `${parseFloat(width.toFixed(4))}%`, left: `${parseFloat(left).toFixed(4)}%`};
		}

		if(cell._first) {
			return {
        width: `${parseFloat((100 - cell._first.diff(cell._first.clone().startOf('day'), 'm') * 100 / 1440).toFixed(4))}%`,
        right: '0'
      };
    }

		if(cell._last) {
			return {
        width: `${parseFloat((cell._last.diff(cell._last.clone().startOf('day'), 'm') * 100 / 1440).toFixed(4))}%`,
        left: '0'
      };
    }

		return {width: `100%`};
	}
}
