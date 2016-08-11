import app from '../../app';
import moment from 'moment';

describe('Calendar App', () => {
  describe('CalendarService', () => {
    let CalendarService;

    beforeEach(() => {
      angular.mock.module(app);
    });

    beforeEach(inject((_CalendarService_) => {
      CalendarService = _CalendarService_;
      CalendarService._lastLoaded = moment();
    }));

    describe('loadMoreDates method', () => {
      it('should return updated array with dates', () => {
        let lastLoaded = CalendarService._lastLoaded.clone().add(1, 'M');
        let count = new Date(lastLoaded.year(), lastLoaded.month() + 1, 0).getDate();
        let dates = [];

        for (let i = 1; i <= count; i++) {
          let date = moment({d: i, M: lastLoaded.month(), Y: lastLoaded.year()});
          dates.push({
            date: date,
            weekend: CalendarService.isWeekend(date),
            current: moment().isSame(date, 'd'),
            opened: {
              start: false,
              end: false
            }
          });
        }

        expect(dates).toEqual(CalendarService.loadMoreDates([]));
      });
    });
  });
});
