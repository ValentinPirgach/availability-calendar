import moment from 'moment/moment.js';
import _ from 'lodash/lodash.js';

export default class CalendarService {
  constructor($http) {
    this._lastLoaded = {};
    this._maxAddedMonthes = 6;
    this._maxDate = moment().add(this._maxAddedMonthes, 'M');
    this.days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    this.dates = [];
    this.availabilities = [];

    this.$http = $http;
  }

  getDayNames () {
    return this.days;
  }

  setDates (dates) {
    _.assign(this.dates, dates);
  }

  getDates () {
    return this.dates;
  }

  /**
   * Getting price from api
   **/
  getPrices () {
    this.$http.get('/api/prices.json').then((resp) => {
      this.pricingRules = resp.data.pricingRules;
      this.renderPrices();
    });
  }

  /**
   * Getting availabilities from api
   **/
  getAvailabilities () {
    this.$http.get('/api/single_car_availabilities.json').then((resp) => {
      this.availabilities = resp.data.availabilities;
      this.renderAvailabilities();
    });
  }

  /**
	 * Detect weekend
	 **/
	isWeekend (date) {
		return date.day() === 0 || date.day() === 5 || date.day() === 6;
	}

	/**
	 * Creating calendar dates
	 **/
	generateDates (_moment_) {
		_moment_ = _moment_ || moment();

		var count = new Date(_moment_.year(), _moment_.month() + 1, 0).getDate(),
				dates = [];

		for (let i = 1; i <= count; i++) {
			let date = moment({d: i, M: _moment_.month(), Y: _moment_.year()});
			dates.push({
				date: date,
				weekend: this.isWeekend(date),
				current: moment().isSame(date, 'd')
			});
		}

		let dow = moment(this._lastLoaded).date(1).day();
		for(let i = 0; i < dow; i++) {
			let date = moment(this._lastLoaded).date(1).subtract(i+1, 'day');
			dates.unshift({date: date, weekend: this.isWeekend(date), prevMonth: true});
		}

    this._lastLoaded = _moment_.startOf('month');

		return dates;
	}

  loadMoreDates (dates) {
    if(this._lastLoaded.isSameOrBefore(this._maxDate)) {
      this._lastLoaded.add(1, 'M');

      var count = new Date(this._lastLoaded.year(), this._lastLoaded.month() + 1, 0).getDate();

  		for (let i = 1; i <= count; i++) {
  			let date = moment({d: i, M: this._lastLoaded.month(), Y: this._lastLoaded.year()});
  			dates.push({
  				date: date,
  				weekend: this.isWeekend(date),
  				current: moment().isSame(date, 'd')
  			});
  		}
    }

    this.renderPrices();

    return _.assign(this.dates, dates);
  }

  /**
   * Viewing prices in cells
   **/
  renderPrices () {
    _.forEach(this.dates, (date) => {
      this.setRegularPrice(date, _.filter(this.pricingRules, {type: 'RegularRule'}));
      this.setSpecificPrice(date, _.filter(this.pricingRules, {type: 'SpecificRule'}));
    });

    return this;
  }


  /**
  * Viewing regular price
  **/
  setRegularPrice (date, prices) {
    _.forEach(prices, (price) => {
      price.startDate = price.startDate || moment().startOf('day');
      price.endDate = price.endDate || moment().year(2056).startOf('day');

      if (moment(date.date).isBetween(price.startDate, price.endDate, null, '[]')) {
        //weekend price
        if (this.isWeekend(date.date)) {
          date.price = price.perDayWkndAmount;
        } else {
          date.price = price.perDayWdAmount;
        }
      }
    });
  }

  /**
  * Viewing special price
  **/
  setSpecificPrice (date, prices) {
    _.forEach(prices, (price) => {
      price.startDate = moment(price.startDate || moment()).startOf('day');
      price.endDate = moment(price.endDate || moment().year(2056)).startOf('day');

      if (moment(date.date).isBetween(price.startDate, price.endDate, null, '[]')) {
        if (price.percentages) {
          _.assign(date, {specificPrice: {price: price.perDayAmount / 100 * date.price}});
        }
        else {
          _.assign(date, {specificPrice: {price: price.perDayAmount}});
        }

        _.assign(date.specificPrice, {
          unbroken: !price.broken,
          _first: date.date.isSame(price.startDate, 'day'),
          _last: date.date.isSame(price.endDate, 'day')
        });
      }
    });
  }

  /**
   * Viewing car availability
   **/
  renderAvailabilities  () {
    _.forEach(this.dates, (date) => {
      _.forEach(this.availabilities, (avail) => {
        let day_availability = {};

        if (date.date.isBetween(moment(avail.startDateNy), moment(avail.endDateNy))) {
          _.assign(day_availability, {busy: true});
        }

        if (date.date.isSame(moment(avail.startDateNy), 'day')) {
          _.assign(day_availability, {
            busy: true,
            _first: moment(avail.startDateNy)
          });
        }

        if (date.date.isSame(moment(avail.endDateNy), 'day')) {
          _.assign(day_availability, {
            busy: true,
            _last: moment(avail.endDateNy)
          });
        }

        if(!date.availability) {
          _.assign(date, {availability: []});
        }

        if(!_.isEmpty(day_availability)) {
          date.availability.push(day_availability);
        }
      });
    });

    if(!_.isEmpty(this._chosenPeriod)) {
      console.log();
      this.selectDates(this._chosenPeriod);
    }
  }
}
