import dates from './test-data/date-list.js';
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
      CalendarService.dates = dates;
    }));

    describe('clearData method', () => {
      it('should clear loaded data from each date object', () => {
        CalendarService.clearData().forEach((date) => {
          if(date.availability)
            expect([]).toEqual(date.availability);

          if(date.price)
            expect(null).toEqual(date.price);

          if(date.specificPrice)
            expect(null).toEqual(date.specificPrice);
        });
      });
    });
  });
});
