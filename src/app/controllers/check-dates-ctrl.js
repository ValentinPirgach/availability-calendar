export default class CheckDatesCtrl {
  constructor($scope, CalendarService) {
    this.$scope = $scope;
    this.CalendarService = CalendarService;
    this.dates = {

    };

    this.errors = {};
  }

  clearRange () {
    this.dates = {};
    this.errors = {};
  }

  formatDate (date) {
    if(date)
      return date.format('MM/DD/YYYY hh:mm a');
  }

  rangeChange (range, errors) {
    this.dates = range;
    this.errors = errors;
  }

  getDate (date) {
    if(date && date.date && date.time) {
      return moment(date.date).hours(date.time.hours()).minutes(date.time.minutes()).format();
    }
  }
}
