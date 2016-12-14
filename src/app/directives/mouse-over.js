export default function mouseOver (CalendarService, $timeout) {
  return {
    link (scope, element, attr) {
      let selected = 'selected';

      if(scope.date.current) {
        $timeout(() => {
          $('.dates-wrapper').scrollTop($(element).position().top);
        });
      }

      angular.element(element).on('mousedown', (event) => {
        let period = CalendarService.getFirstAndLastSelected();

        if(scope.date.date.clone().startOf('day').isBefore(moment().startOf('day'))) {
          return false;
        }

        if(period.first && period.last) {
          let openedTime = [
            period.first.opened.first,
            period.first.opened.last,
            period.last.opened.first,
            period.last.opened.last
          ];

          if(_.some(openedTime, (opened) => opened)) {
            period.first.opened.first = false;
            period.first.opened.last = false;
            period.last.opened.first = false;
            period.last.opened.last = false;
            scope.$apply();
            return false;
          }
        }

        $('.date-wrapper').removeClass(selected);
        CalendarService.touched = event;
        CalendarService.setStart(scope.date);
        $(event.target).parents('.date-wrapper').addClass(selected);
        scope.$apply();
      });

      angular.element(element).on('mouseover', (event) => {
        if(!_.isEmpty(CalendarService.touched)) {
          let elements = $('.date-wrapper');

          if(scope.date.date.clone().startOf('day').isBefore(moment().startOf('day'))) {
            return false;
          }

          //elements.removeClass(selected);
          let touched = $(CalendarService.touched.target).parents('.date-wrapper'),
              moved = $(event.target).parents('.date-wrapper');

          let begin = touched.index(),
              end = moved.index();

          if(begin > end) {
            let tmp = begin;
            begin = end;
            end = tmp;
          }

          if(begin >= 0 && end >= 0) {
            for(let i = begin; i <= end; i++) {
              if(!angular.element(elements[i]).hasClass('selected')) {
                angular.element(elements[i]).addClass('selected');
              }
            }
          }

          CalendarService.updateEnd(scope.date);
          scope.$apply();
        }
      });

      angular.element(element).on('mouseup', (event) => {
        if(!_.isEmpty(CalendarService.touched)) {
          if(scope.date.date.clone().startOf('day').isBefore(moment().startOf('day'))) {
            let currentDate = _.find(CalendarService.dates, {current: true});
            CalendarService.touched = {};
            CalendarService.setEnd(currentDate);
            scope.$apply();
            return;
          }

          CalendarService.touched = {};
          CalendarService.setEnd(scope.date);
          scope.$apply();
        }
      });
    }
  };
}
