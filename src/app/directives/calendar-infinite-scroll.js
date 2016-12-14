//import $ from 'jquery';

export default function calendarInfiniteScroll (CalendarService, $timeout) {
    return {
        link (scope, element, attr) {
          $timeout(() => {
            $(element).scrollTop($('.date-wrapper .current').position().top);
          });

          let lastScrollTop = 0;

          $(element).on('scroll', function(event) {
              let st = $(this).scrollTop();

              if (st > lastScrollTop){
                if($(element)[0].scrollTop + $(element)[0].offsetHeight >= $(element)[0].scrollHeight - $(element)[0].offsetHeight / 2) {
                    CalendarService.loadMoreDates(scope.Calendar.dates, scope.Calendar.lines, null, () => {
                      scope.$apply();
                    });
                }
              } else {
                if($(element)[0].scrollTop < 93) {
                  CalendarService.loadMoreDates(scope.Calendar.dates, scope.Calendar.lines, 'prev', () => {
                    $(element).scrollTop(558);
                  });

                  scope.$apply();
                }
              }

              lastScrollTop = st;
          });
        }
    };
}
