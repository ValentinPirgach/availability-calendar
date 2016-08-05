import app from '../../app';
import moment from 'moment/moment.js';

describe('Loading more dates:', () => {
  let CalendarService, loadedDates;

  beforeEach(() => {
    angular.mock.module(app);

    angular.mock.inject((_CalendarService_) => {
      CalendarService = _CalendarService_;
    });

    let initialDates = CalendarService.generateDates(moment('08/04/2016', 'MM/DD/YYYY'));
        loadedDates = CalendarService.loadMoreDates(initialDates);
  });

  it('should be updated araay with added one month', () => {
    for(let i=0; i < loadedDates.length; i++) {
      if(loadedDates[i].date.month() === 6) {
        expect(loadedDates[i].date.date()).toEqual(31);
      }

      if(loadedDates[i].date.month() === 7) {
        expect(loadedDates[i].date.date()).toEqual(i);
      }

      if(loadedDates[i].date.month() === 8 && (i - 31) !== 0) {
        expect(loadedDates[i].date.date()).toEqual(i - 31);
      }
    }
  });

  it('should be added one month to _lastLoaded object', () => {
    expect(CalendarService._lastLoaded.month()).toEqual(8);
  });

  it('should stop load more date if _lastLoaded more then max date', () => {
      for(let i = 0; i < 10; i++) {
          let updating = CalendarService.loadMoreDates(loadedDates);
          let testDate = moment('08/04/2016', 'MM/DD/YYYY').add(CalendarService._maxAddedMonthes, 'M');

          if(CalendarService._maxAddedMonthes - 1 > i) {
            expect(CalendarService._lastLoaded.isBefore(testDate)).toBe(true);
          } else {
            expect(CalendarService._lastLoaded.isBefore(testDate)).toBe(false);
          }

          loadedDates = updating;
      }
  });
});
