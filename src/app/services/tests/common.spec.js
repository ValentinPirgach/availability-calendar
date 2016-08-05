import app from '../../app';
import moment from 'moment/moment.js';

describe('Calendar Service Common:', () => {
  let CalendarService;

  beforeEach(() => {
    angular.mock.module(app);

    angular.mock.inject((_CalendarService_) => {
      CalendarService = _CalendarService_;
    });
  });

  it('should reutrn list of days of week, starting from SUN', () => {
    expect(CalendarService.getDayNames()).toEqual(['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']);
  });

  it('should return if weekend', () => {
    expect(CalendarService.isWeekend(moment().day(0))).toBe(true);
    expect(CalendarService.isWeekend(moment().day(5))).toBe(true);
    expect(CalendarService.isWeekend(moment().day(6))).toBe(true);
    expect(CalendarService.isWeekend(moment().day(4))).not.toBe(true);
  });

  it('should return array of day objects (august 2016)', () => {
    expect(CalendarService.generateDates(moment('08/03/2016', 'MM/DD/YYYY'))[0].date.date()).toBe(31);
    expect(CalendarService.generateDates(moment('08/03/2016', 'MM/DD/YYYY'))[31].date.date()).toBe(31);
    expect(CalendarService._lastLoaded.date()).toEqual(1);
    expect(CalendarService._lastLoaded.month()).toEqual(7);
  });
});
