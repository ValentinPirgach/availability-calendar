export default function timepicker () {
  return {
    template: require('../views/tpl-timepicker.pug'),
    controller: 'TimepickerCtrl',
    controllerAs: 'Time',
    link (scope, element) {
      angular.element(element).on('click mousedown mouseup', (event) => {
        event.stopPropagation();
        event.preventDefault();
      });

      angular.element(element).addClass('timepicker-wrapper');
    }
  };
}
