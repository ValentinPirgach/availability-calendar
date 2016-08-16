export default function dateTimePicker ($timeout) {
  return {
    template: require('../views/tpl-date-timepicker.pug'),
    scope: {
      date: '=dateTimePicker',
      minDate: '=',
      dateChange: '&'
    },
    controller: 'DateTimePickerCtrl',
    controllerAs: 'Date',
    link (scope, element, attr) {

      scope.$watch('date', (date) => {
        if(date && !_.isEmpty(date)) {
          scope.Date.update(date);
        }
      });
    }
  };
}
