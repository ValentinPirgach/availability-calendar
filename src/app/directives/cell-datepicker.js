export default function cellDatepicker (CalendarService, $timeout, $parse) {
  return {
    scope: {
      inline: '@',
      format: '@',
      mode: '@',
      position: '@',
      disabledDates: '=',
      maxDate: '=',
      minDate: '=',
      timeFor: '='
    },
    require: '?ngModel',
    link (scope, element, attr, ngModel) {
      moment.createFromInputFallback = function(config) { config._d = new Date(config._i); };

      ngModel.$formatters.push((value) => value);
      ngModel.$parsers.push((value) => value);

      let defaultOptions = {
        debug: process.env.npm_lifecycle_event === 'server',
        widgetPositioning: {
          horizontal: scope.position ? scope.position.split(/,|;|:/)[0] : '',
          vertical: scope.position ? scope.position.split(/,|;|:/)[1] : ''
        },
        inline: Boolean(scope.inline),
        format: scope.format,
        minDate: scope.minDate === 'today' ? moment() : null
      };


      if(Boolean(scope.inline) && angular.element(element).prop('tagName').toLowerCase() === 'input') {
        angular.element(element).css({'visibility': 'hidden', 'width': 0});
      }

      $(element).datetimepicker(defaultOptions).on('dp.change', (e) => {
        ((event) => {
          $timeout(() => {
            ngModel.$setViewValue(event.date.format(scope.format));
            ngModel.$render();
          });
        })(e);
      });

      scope.$watch('minDate', (minDate) => {
        (() => {
          $timeout(() => {
            console.log('minDate', minDate);
            if(scope.minDate && !_.isEmpty(minDate)) {
              $(element).data('DateTimePicker').minDate(moment(minDate, scope.format));
            }
          });
        })();
      });

      scope.$watch(() => ngModel.$viewValue, (viewValue) => {
        (() => {
          $timeout(() => {
            $(element).data('DateTimePicker').date(moment(viewValue, scope.format));
            ngModel.$setViewValue(viewValue);
            ngModel.$render();
          });
        })();
      });
    }
  };
}
