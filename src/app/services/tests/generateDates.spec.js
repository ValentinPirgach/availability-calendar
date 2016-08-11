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
    }));

    describe('generateDates method', () => {
      it('should return array of dates', () => {
        let count = new Date(moment().year(), moment().month() + 1, 0).getDate(),
            dates = [],
            lastLoaded;

        for (let i = 1; i <= count; i++) {
          let date = moment({d: i, M: moment().month(), Y: moment().year()}).startOf('day');
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

        let dow = moment().startOf('month').day();

        for(let i = 0; i < dow; i++) {
          let date = moment().startOf('month').subtract(i+1, 'd').startOf('day');
          dates.unshift({
            date: date,
            weekend: CalendarService.isWeekend(date),
            prevMonth: true,
            opened: {
              start: false,
              end: false
            }
          });
        }

        lastLoaded = moment().startOf('month');

        CalendarService.generateDates().forEach((value, index) => {
          expect(dates[index]).toEqual(value);
        });
      });
    });
  });
});
