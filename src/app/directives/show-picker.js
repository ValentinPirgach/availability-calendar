export default function showPicker (CalendarService, $timeout) {
  return {
    link(scope, element, attr) {
      $(element).on('mousedown mouseup', (event) => {
        if(!_.isEmpty(CalendarService.touched)) return;

        event.stopPropagation();

        if(event.type === 'mouseup') {
          _.forEach(CalendarService.getFirstAndLastSelected(), (value, key) => {
            if(key !== attr.showPicker) {
              value.opened[key] = false;
            } else {
              value.opened[key] = !value.opened[key];
            }
          });

          $timeout(function () {
            $('.time-value').on('mousedown mouseup', (e) => {
              e.preventDefault();
              e.stopPropagation();
              $(e.target).trigger('focus').select();
            });
          });

          scope.$apply();
        }
      });
    }
  };
}
