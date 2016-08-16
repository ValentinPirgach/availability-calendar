export default class DateTimePickerCtrl {
  constructor($scope) {
    this.dateFormat = 'MM/DD/YYYY';
    this.timeFormat = 'hh:mm a';
    this.scope = $scope;
  }

  dateChanged () {
    this.dateMoment = moment(this.date, this.dateFormat);
    if(!this.time) {
      let minutes = this.dateMoment.minutes(),
          hours = this.dateMoment.hours();

      this.time = this.dateMoment.clone().minutes(minutes).hours(hours);
    }

    this.timeChanged();
  }

  timeChanged () {
    let hours = moment(this.time, this.timeFormat).hours(),
        minutes = moment(this.time, this.timeFormat).minutes();

    this.dateMoment = this.dateMoment.clone().hours(hours).minutes(minutes);

    this.scope.dateChange({$date: this.dateMoment});
  }

  update (date) {
    this.dateMoment = date;
    this.date = date.format(this.dateFormat);
    this.time = date.format(this.timeFormat);
  }
}
