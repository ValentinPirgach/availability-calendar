export default function (CalendarService) {
    return {
      controller: 'CalendarCtrl',
      controllerAs: 'Calendar',
      template: require('../views/tpl-calendar.pug'),
      scope: {
        availabilities: '=',
        prices: '=',
        selectedPeriod: '=',
        errors: '='
      },
      link (scope) {
        CalendarService.selectedPeriod = scope.selectedPeriod;

        scope.$watchGroup(['prices', 'availabilities'], (data) => {
          CalendarService.renderData(data[0], data[1]);
        });

        scope.$watchGroup([() => CalendarService.selectedPeriod, () => CalendarService.errors], (data) => {
          scope.selectedPeriod = data[0];
          console.log(data[1]);
          scope.errors = data[1];
        });
      }
    };
}
