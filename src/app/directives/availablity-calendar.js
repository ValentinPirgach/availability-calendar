export default function (CalendarService) {
    return {
      controller: 'CalendarCtrl',
      controllerAs: 'Calendar',
      template: require('../views/tpl-calendar.pug'),
      scope: {
        availabilities: '=',
        prices: '=',
        selectedPeriod: '=',
        errors: '=',
        rangeChange: '&',
        dates: '='
      },
      link (scope) {
        CalendarService.setChangeCallback(scope.rangeChange);

        scope.$watchGroup(['selectedPeriod.dateStart', 'selectedPeriod.dateEnd'], (period) => {
          if(period[0] && period[1] && !_.isEmpty(period[0]) && !_.isEmpty(period[1])) {
            CalendarService.setSelected(period[0], period[1]);
          }
        });

        scope.$watchGroup(['prices', 'availabilities'], (data) => {
          CalendarService.renderData(data[0], data[1]);
        });

        // scope.$watchGroup([() => CalendarService.selectedPeriod, () => CalendarService.errors], (data) => {
        //   scope.selectedPeriod = data[0];
        //   scope.rangeChange();
        //   //scope.errors = data[1];
        // });
      }
    };
}
