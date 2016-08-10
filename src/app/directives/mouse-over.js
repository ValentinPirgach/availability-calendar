export default function mouseOver (CalendarService) {
  return {
    link (scope, element, attr) {
      let selected = 'selected';

      angular.element(element).on('mousedown', (event) => {
        let period = CalendarService.getFirstAndLastSelected();

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
          $('.date-wrapper').removeClass(selected);
          let touched = $(CalendarService.touched.target).parents('.date-wrapper'),
              moved = $(event.target).parents('.date-wrapper'),
              elements = $('.date-wrapper');

          let begin = touched.index(),
              end = moved.index();

          if(begin > end) {
            let tmp = begin;
            begin = end;
            end = tmp;
          }

          for(let i = begin; i <= end; i++) {
            if(!angular.element(elements[i]).hasClass('selected'))
              angular.element(elements[i]).addClass('selected');
          }

          CalendarService.updateEnd(scope.date);
          scope.$apply();
        }
      });

      angular.element(element).on('mouseup', (event) => {
        if(!_.isEmpty(CalendarService.touched)) {
          CalendarService.touched = {};
          CalendarService.setEnd(scope.date);
          scope.$apply();
        }
      });
    }
  };
}
