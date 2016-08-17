import app from '../../app';
import moment from 'moment';

describe('Calendar App', () => {
  describe('CalendarService', () => {
    let CalendarService, http;

    beforeEach(() => {
      angular.mock.module(app);
    });

    beforeEach(inject((_CalendarService_, $http) => {
      CalendarService = _CalendarService_;
      CalendarService.availabilities = [{"id":741,"status":"approved","startDate":"2016-08-13T18:01:00.000Z","endDate":"2016-08-16T14:59:00.000Z","startDateNy":"2016-08-13 14:01:00","endDateNy":"2016-08-16 10:59:00"},{"id":707,"status":"completed","startDate":"2016-07-28T15:01:00.000Z","endDate":"2016-07-28T15:59:00.000Z","startDateNy":"2016-07-28 11:01:00","endDateNy":"2016-07-28 11:59:00"},{"id":706,"status":"completed","startDate":"2016-08-01T12:01:00.000Z","endDate":"2016-08-01T15:59:00.000Z","startDateNy":"2016-08-01 08:01:00","endDateNy":"2016-08-01 11:59:00"},{"id":705,"status":"completed","startDate":"2016-07-31T12:01:00.000Z","endDate":"2016-07-31T15:59:00.000Z","startDateNy":"2016-07-31 08:01:00","endDateNy":"2016-07-31 11:59:00"},{"id":703,"status":"approved","startDate":"2016-08-09T03:01:00.000Z","endDate":"2016-08-13T16:59:00.000Z","startDateNy":"2016-08-08 23:01:00","endDateNy":"2016-08-13 12:59:00"},{"id":702,"status":"approved","startDate":"2016-09-21T11:04:00.000Z","endDate":"2016-09-22T15:02:00.000Z","startDateNy":"2016-09-21 07:04:00","endDateNy":"2016-09-22 11:02:00"},{"id":688,"status":"completed","startDate":"2016-07-29T12:01:00.000Z","endDate":"2016-07-30T15:59:00.000Z","startDateNy":"2016-07-29 08:01:00","endDateNy":"2016-07-30 11:59:00"},{"id":667,"status":"completed","startDate":"2016-07-26T08:01:00.000Z","endDate":"2016-07-26T13:59:00.000Z","startDateNy":"2016-07-26 04:01:00","endDateNy":"2016-07-26 09:59:00"},{"id":636,"status":"approved","startDate":"2016-10-10T12:01:00.000Z","endDate":"2016-10-12T16:59:00.000Z","startDateNy":"2016-10-10 08:01:00","endDateNy":"2016-10-12 12:59:00"},{"id":635,"status":"approved","startDate":"2016-08-28T12:01:00.000Z","endDate":"2016-08-29T15:59:00.000Z","startDateNy":"2016-08-28 08:01:00","endDateNy":"2016-08-29 11:59:00"},{"id":634,"status":"approved","startDate":"2016-08-26T12:01:00.000Z","endDate":"2016-08-27T15:59:00.000Z","startDateNy":"2016-08-26 08:01:00","endDateNy":"2016-08-27 11:59:00"},{"id":633,"status":"approved","startDate":"2016-08-24T12:01:00.000Z","endDate":"2016-08-25T15:59:00.000Z","startDateNy":"2016-08-24 08:01:00","endDateNy":"2016-08-25 11:59:00"}];
      CalendarService.pricingRules = [{"id":35,"priority":1,"isAllCars":false,"startDate":"2016-08-01","endDate":"2016-08-17","type":"SpecificRule","perDayAmount":10.0,"broken":false,"percentages":true},{"id":26,"priority":1,"isAllCars":true,"startDate":"2001-01-01","endDate":null,"type":"RegularRule","perDayWdAmount":149.0,"perDayWkndAmount":149.0}];
      CalendarService.pricingRules.forEach((price) => {
          price.startDate = moment(price.startDate || moment()).startOf('day');
          price.endDate = moment(price.endDate || moment().year(2056)).startOf('day');
      });
    }));

    describe('checkForErrors method', () => {
      it('should return empty object', () => {
        let period = {
          "dateStart": moment("2016-08-20T21:00:00.000Z"),
          "dateEnd": moment("2016-08-23T20:59:59.999Z")
        };

        expect(CalendarService.checkForErrors(period)).toEqual({});
      });

      it('should be defined unavailableDates property', () => {
        let period = {
          "dateStart": moment("2016-08-13T21:00:00.000Z"),
          "dateEnd": moment("2016-08-18T20:59:59.999Z")
        };

         expect(CalendarService.checkForErrors(period).unavailableDates).toBeDefined();
      });

      it('should be defined unbrokenPrice property', () => {
        let period = {
          "dateStart": moment("2016-08-01T21:00:00.000Z"),
          "dateEnd": moment("2016-08-04T20:59:59.999Z")
        };
        expect(CalendarService.checkForErrors(period).unbrokenPrice).toBeDefined();
      });

      it('should be defined both properties (unbrokenPrice and unavailableDates)', () => {
        let period = {
          "dateStart": moment("2016-08-07T21:00:00.000Z"),
          "dateEnd": moment("2016-08-11T20:59:59.999Z")
        };
        expect(CalendarService.checkForErrors(period).unavailableDates).toBeDefined();
        expect(CalendarService.checkForErrors(period).unbrokenPrice).toBeDefined();
      });

      it('should return empty object if availabilities or pricies is undefined', () => {
        CalendarService.availabilities = [];
        CalendarService.pricingRules = [];

        let period = {
          "dateStart": moment("2016-08-07T21:00:00.000Z"),
          "dateEnd": moment("2016-08-11T20:59:59.999Z")
        };
        expect(CalendarService.checkForErrors(period).unavailableDates).not.toBeDefined();
        expect(CalendarService.checkForErrors(period).unbrokenPrice).not.toBeDefined();
      });
    });
  });
});
