export default class MainCtrl {
  constructor($scope, $http) {
    this.$scope = $scope;
    this.$http = $http;
    this.dates = {
      dateStart: false,
      dateEnd: false
    };

    this.errors = {};
  }

  /**
   * Getting price from api
   **/
  getPrices () {
    console.log('ok');
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
    if(date)
      return date.format('MM/DD/YYYY hh:mm a');
  }
}
