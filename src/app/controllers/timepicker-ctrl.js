let selectedDate = {};

export default class TimepickerCtrl {
  constructor($scope, CalendarService) {
    this.date = $scope.date;

    if($scope.date.opened.first) {
      this.time = $scope.date._first;
    } else if ($scope.date.opened.last) {
      this.time = $scope.date._last;
    }

    selectedDate = this.time.clone();

    this.updateTime();

    this.timeLimit = {
      min: this.date.date.clone().startOf('day'),
      max: this.date.date.clone().endOf('day')
    };

    this.CalendarService = CalendarService;
  }

  invalidTime (time) {
    if(this.date._first && this.date._last) {
      if(this.date._first.clone().add(1, 'h').isAfter(this.date._last, 'h')) {
        this.date._last.hours(this.date._first.clone().add(1, 'h').hours());
      }
    }

    return time.isAfter(this.timeLimit.max, 'm') || time.isBefore(this.timeLimit.min, 'm');
  }

  updateTime () {
    this.hours = this.time.format('hh');
    this.minutes = this.time.format('mm');
    this.part = this.time.format('A');

    if(this.CalendarService) {
      this.CalendarService.renderSelected();
    }
  }

  updateInput () {
    if(this.invalidTime(this.time.clone().hours(parseInt(this.hours)).minutes(parseInt(this.minutes)))) {
      console.log('invalid');
      return;
    }

    this.time.hours(this.hours).minutes(this.minutes);
    this.updateTime();
  }

  addHour () {
    if(this.invalidTime(this.time.clone().add(1, 'h'))) {
      return;
    }

    this.time.add(1, 'h');
    this.updateTime();
  }

  subtractHour () {
    if(this.invalidTime(this.time.clone().subtract(1, 'h'))) {
      return;
    }

    this.time.subtract(1, 'h');
    this.updateTime();
  }

  addMinute () {
    if(this.invalidTime(this.time.clone().add(1, 'm'))) {
      return;
    }

    this.time.add(1, 'm').format('mm');
    this.updateTime();
  }

  subtractMinute () {
    if(this.invalidTime(this.time.clone().subtract(1, 'm'))) {
      return;
    }

    this.time.subtract(1, 'm').format('mm');
    this.updateTime();
  }

  changePart () {
    let changed = this.time.clone().format('a') === 'am' ? this.time.clone().add(12, 'h') : this.time.clone().subtract(12, 'h');

    if(this.invalidTime(changed)) {
      console.log('inval');
      return;
    }

    this.time.hours(changed.hours());
    this.updateTime();
  }
}
