//import $ from 'jquery';

export default function calendarInfiniteScroll (CalendarService) {
    return {
        link (scope, element, attr) {
          $(element).on('scroll', (event) => {
              if($(element)[0].scrollTop + $(element)[0].offsetHeight >= $(element)[0].scrollHeight - $(element)[0].offsetHeight / 2) {
                  CalendarService.loadMoreDates(scope.Calendar.dates);
                  scope.$apply();
              }
          });
        }
    };
}
