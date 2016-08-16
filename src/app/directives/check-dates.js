export default function checkDates () {
  return {
    template: require('../views/tpl-check-dates.pug'),
    scope: {
      start: '=',
      end: '='
    },
    controller: 'CheckDatesCtrl',
    controllerAs: 'Check',
    link (scope, element, attr) {
      scope.$watchGroup(['start', 'end'], (dates) => {
        console.log(dates);
      });
    }
  };
}
