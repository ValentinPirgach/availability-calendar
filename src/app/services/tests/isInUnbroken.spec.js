import prices from './test-data/price.js';
import app from '../../app';
import moment from 'moment';
import _ from 'lodash';

describe('Calendar App', () => {
  describe('CalendarService', () => {
    let CalendarService;

    beforeEach(() => {
      angular.mock.module(app);
    });

    beforeEach(inject((_CalendarService_) => {
      CalendarService = _CalendarService_;
      CalendarService.pricingRules = prices;
    }));

    describe('isInUnbroken method', () => {
      it('should return true if period overlaps from left with unbroken price period', () => {
        let period = {
          "dateStart": moment("2016-07-30T21:00:00.000Z"),
          "dateEnd": moment("2016-08-05T20:59:59.999Z")
        };

        expect(true).toBe(CalendarService.isInUnbroken(period));
      });

      it('should return true if period overlaps from right with unbroken price period', () => {
        let period = {
          "dateStart": moment("2016-08-13T21:00:00.000Z"),
          "dateEnd": moment("2016-08-26T20:59:59.999Z")
        };

        expect(true).toBe(CalendarService.isInUnbroken(period));
      });

      it('should return true if period overlaps inside with unbroken price period', () => {
        let period = {
          "dateStart": moment("2016-08-07T21:00:00.000Z"),
          "dateEnd": moment("2016-08-13T20:59:59.999Z")
        };

        expect(true).toBe(CalendarService.isInUnbroken(period));
      });

      it('should return true if period overlaps inside (limit dates) with unbroken price period', () => {
        let period = {
          "dateStart": moment("2016-07-31T21:00:00.000Z"),
          "dateEnd": moment("2016-08-13T20:59:59.999Z")
        };

        expect(true).toBe(CalendarService.isInUnbroken(period));
      });

      it('should return false if period not overlaps with unbroken price period (left side)', () => {
        let period = {
          "dateStart": moment("2016-08-17T21:00:00.000Z"),
          "dateEnd": moment("2016-08-20T20:59:59.999Z")
        };

        expect(false).toBe(CalendarService.isInUnbroken(period));
      });

      it('should return false if period not overlaps with unbroken price period (right side)', () => {
        let period = {
          "dateStart": moment("2016-07-30T21:00:00.000Z"),
          "dateEnd": moment("2016-07-31T20:59:59.999Z")
        };

        expect(false).toBe(CalendarService.isInUnbroken(period));
      });
    });
  });
});
