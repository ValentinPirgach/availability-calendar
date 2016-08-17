import checkAvailability from './calendar.services.components/checkAvailability';
import isInUnbroken from './calendar.services.components/isInUnbroken';
import renderSelected from './calendar.services.components/renderSelected';
import renderData from './calendar.services.components/renderData';
import loadMoreDates from './calendar.services.components/loadMoreDates';
import setRegularPrice from './calendar.services.components/setRegularPrice';
import setSpecificPrice from './calendar.services.components/setSpecificPrice';
import renderAvailabilities from './calendar.services.components/renderAvailabilities';
import generateDates from './calendar.services.components/generateDates';
import renderPrices from './calendar.services.components/renderPrices';
import clear from './calendar.services.components/clear';
import clearData from './calendar.services.components/clearData';
import checkAllAvailabilities from './calendar.services.components/checkAllAvailabilities.js';
import checkForErrors from './calendar.services.components/checkForErrors.js';

export default class CalendarService {
  constructor($rootScope) {
    this._lastLoaded = {};
    this._maxAddedMonthes = 6;
    this._maxDate = moment().add(this._maxAddedMonthes, 'M');
    this.days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    this.dates = [];
    this.availabilities = [];
    this.pricingRules = [];
    this.selected = [];
    this.selectedDates = [];
    this.selectedPeriod = {};
    this.touched = {};
    this.lastOpened = {};
    this.errors = {};
    this.changeCallback = null;

    this.$rootScope = $rootScope;
  }

  getDayNames () {
    return this.days;
  }

  setDates (dates) {
    _.assign(this.dates, dates);
  }

  setStart (date) {
    this.selected = {};
    this.selected.start = date.date;
  }

  setEnd (date) {
    this.selected.end = date.date;
    let dates = [this.selected.start, this.selected.end].sort((dateS, dateE) => dateS.isAfter(dateE));
    this.renderSelected({dateStart: moment(dates[0]).startOf('day'), dateEnd: moment(dates[1]).endOf('day')});
    this.changeCallback({
      $range: this.selectedPeriod,
      $calendarErrors: this.checkForErrors(this.selectedPeriod)
    });
  }

  setSelected (start, end) {
    this.renderSelected({dateStart:start, dateEnd: end});
  }

  setLastOpened (date) {
    this.lastOpened = date;
  }

  setChangeCallback (callback) {
    this.changeCallback = callback;
  }

  getDates () {
    return this.dates;
  }

  updateEnd (date) {
    this.selected.end = date.date;
    let dates = [this.selected.start, this.selected.end].sort((dateS, dateE) => dateS.isAfter(dateE));
    this.renderSelected({dateStart: moment(dates[0]).startOf('day'), dateEnd: moment(dates[1]).endOf('day')});
  }

	isWeekend (date) {
		return date.day() === 0 || date.day() === 5 || date.day() === 6;
	}

  getFirstAndLastSelected () {
    return {
      first: _.first(this.selectedDates),
      last: _.last(this.selectedDates)
    };
  }
}

_.assign(CalendarService.prototype, {
  checkAvailability: checkAvailability,
  renderAvailabilities: renderAvailabilities,
  isInUnbroken: isInUnbroken,
  renderSelected: renderSelected,
  renderData: renderData,
  loadMoreDates: loadMoreDates,
  setRegularPrice: setRegularPrice,
  setSpecificPrice: setSpecificPrice,
  generateDates: generateDates,
  renderPrices: renderPrices,
  clear: clear,
  clearData: clearData,
  checkAllAvailabilities: checkAllAvailabilities,
  checkForErrors: checkForErrors
});
