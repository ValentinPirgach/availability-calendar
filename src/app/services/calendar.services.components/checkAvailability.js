export default function checkAvailability (date, period) {
  if(date.availability && date.availability.length) {
    return _.some(date.availability, (availability) => {
      if(availability._first && availability._last) {
        //you can book this car at this day after 'some time'
        return (availability._first.isBetween(period.dateStart, period.dateEnd, 'minutes', '[]') ||
                    availability._last.isBetween(period.dateStart, period.dateEnd, 'minutes', '[]')) ||
               (period.dateStart.isBetween(availability._first, availability._last, 'minutes', '[]') ||
                    period.dateEnd.isBetween(availability._first, availability._last, 'minutes', '[]'));
      }

      if(availability._first) {
        //you can book this car at this day after 'some time'
        return availability._first.isSameOrBefore(period.dateStart, 'minutes') ||
               availability._first.isSameOrBefore(period.dateEnd, 'minutes');
      }

      if(availability._last) {
        //you can book this car at this day after 'some time'
        return availability._last.isSameOrAfter(period.dateStart, 'minutes') ||
               availability._last.isSameOrAfter(period.dateEnd, 'minutes');
      }

      return availability.busy;
    });
  }
}
