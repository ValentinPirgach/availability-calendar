export default class MainCtrl {
  constructor($scope, CalendarService, $timeout, $http) {
    this.$scope = $scope;
    this.CalendarService = CalendarService;
    this.checkIn = {};
    this.checkOut = {};

    this.errors = {};
    this.$timeout = $timeout;
    this.$http = $http;
  }

  clearRange () {
    this.dates = {};
    this.checkIn = {};
    this.checkOut = {};
    this.errors = {};
  }

  /**
   * Getting price from api
   **/
  getPrices () {
    this.$http.get('/api/prices.json').then((resp) => {
      this.pricies = resp.data.pricingRules;
    });
  }

  /**
   * Getting availabilities from api
   **/
  getAvailabilities () {
    this.$http.get('/api/single_car_availabilities.json').then((resp) => {
      this.availabilities = resp.data.availabilities;
    });
  }

  formatDate (date) {
    if(date) {
      return date.format('MM/DD/YYYY hh:mm a');
    }
  }

  dateChange (date, type) {
    this[type] = date;
  }

  rangeChange(period, errors) {
    if(!period.dateStart || !period.dateEnd) return;

    this.checkIn = period.dateStart;
    this.checkOut = period.dateEnd;
    this.errors = errors || null;
  }
}
