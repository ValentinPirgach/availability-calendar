export default class CalendarCtrl {
  constructor(CalendarService) {
    this.dates = [];
    CalendarService.setDates(this.days);
    this.days = CalendarService.getDayNames();
    let dates = CalendarService.generateDates();
    this.dates = CalendarService.loadMoreDates(dates);
    this.selectedDates = [];
    this.CalendarService = CalendarService;
  }

  getDate (_moment_) {
    return _moment_.date();
  }

  getMonth (_moment_) {
    return _moment_.format('MMMM');
  }

  specificPriceClasses (date) {
    return {
      first: date.specificPrice._first,
      last: date.specificPrice._last,
      unbroken: date.specificPrice.unbroken
    };
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
