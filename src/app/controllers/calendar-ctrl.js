export default class CalendarCtrl {
  constructor($scope, CalendarService) {
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

  renderSelected (period) {
    let dates = period.sort((dateS, dateE) => dateS.date.isAfter(dateE.date));
    this.CalendarService.renderSelected({dateStart: dates[0].date, dateEnd: dates[1].date});
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
			let width = moment(cell._last).diff(cell._first, 'm') * 100 / 1440;
			let left = moment(cell._first).diff(cell._first.clone().startOf('day'), 'm') * 100 / 1440;

			return {width: `${width}%`, left: `${left}%`};
		}

		if(cell._first)
			return {width: `${100 - moment(cell._first).diff(cell._first.clone().startOf('day'), 'm') * 100 / 1440}%`, right: 0};

		if(cell._last)
			return {width: `${moment(cell._last).diff(cell._last.clone().startOf('day'), 'm') * 100 / 1440}%`, left: 0};

		return {width: `100%`};
	}

  selectedCell (cell) {
		//same day
		if(cell._first && cell._last) {
			let width = moment(cell._last).diff(cell._first, 'm') * 100 / 1440;
			let left = moment(cell._first).diff(cell._first.clone().startOf('day'), 'm') * 100 / 1440;
			return {width: `${width}%`, left: `${left}%`};
		}

		if(cell._first) {
			return {
        width: `${100 - moment(cell._first).diff(cell._first.clone().startOf('day'), 'm') * 100 / 1440}%`,
        right: '0'
      };
    }

		if(cell._last) {
			return {
        width: `${moment(cell._last).diff(cell._last.clone().startOf('day'), 'm') * 100 / 1440}%`,
        left: 0
      };
    }

		return {width: `100%`};
	}
}
