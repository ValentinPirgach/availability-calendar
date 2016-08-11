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
    }));

    describe('checkAvailability method', () => {
      it('should return true when selected period overlaps with partly busy date', () => {
        let period = {
          "dateStart": moment("2016-07-31T21:00:00.000Z"),
          "dateEnd": moment("2016-08-01T20:59:59.999Z")
        };

        let date = {
          "date": moment("2016-07-31T21:00:00.000Z"),
          "weekend": false,
          "current": false,
          "opened": {
            "first": false,
            "last": false
          },
          "availability": [
            {
              "busy": true,
              "_first": moment("2016-08-01T05:01:00.000Z"),
              "_last": moment("2016-08-01T08:59:00.000Z"),
            }
          ],
          "price": null,
          "specificPrice": null,
          "selected": true,
          "busy": true,
          "unbroken": false,
          "_first": moment("2016-07-31T21:00:00.000Z"),
          "_last": moment("2016-08-01T20:59:59.999Z")
        };

        expect(true).toBe(CalendarService.checkAvailability(date, period));
      });

      it('should return true when selected period overlaps with busy date', () => {
        let period = {
          "dateStart": moment("2016-08-04T21:00:00.000Z"),
          "dateEnd": moment("2016-08-08T20:59:59.999Z")
        };

        let date = {
          "date": moment("2016-08-07T21:00:00.000Z"),
          "weekend": false,
          "current": false,
          "opened": {
            "first": false,
            "last": false
          },
          "availability": [
            {
              "busy": true,
              "_first": moment("2016-08-08T20:01:00.000Z"),
            }
          ],
          "price": null,
          "specificPrice": null,
          "selected": true,
          "busy": true,
          "unbroken": false,
          "_first": moment("2016-08-07T21:00:00.000Z"),
          "_last": moment("2016-08-08T20:59:59.999Z")
        };

        expect(true).toBe(CalendarService.checkAvailability(date, period));
      });

      it('should return true when selected period overlaps with busy date (multiple availabilities in the same day)', () => {
        let period = {
          "dateStart": moment("2016-08-12T21:00:00.000Z"),
          "dateEnd": moment("2016-08-13T20:59:59.999Z")
        };

        let date = {
          "date": moment("2016-08-12T21:00:00.000Z"),
          "weekend": true,
          "current": false,
          "opened": {
            "first": false,
            "last": false
          },
          "availability": [
            {
              "busy": true,
              "_first": moment("2016-08-13T11:01:00.000Z"),
              "$$hashKey": "object:115"
            },
            {
              "busy": true,
              "_last": moment("2016-08-13T09:59:00.000Z"),
              "$$hashKey": "object:116"
            }
          ],
          "price": null,
          "specificPrice": null,
          "selected": true,
          "busy": true,
          "unbroken": false,
          "_first": moment("2016-08-12T21:00:00.000Z"),
          "_last": moment("2016-08-13T20:59:59.999Z")
        };

        expect(true).toBe(CalendarService.checkAvailability(date, period));
      });

      it('should return false when selected period not overlaps with busy date (partly busy day - last availability)', () => {
        let period = {
          "dateStart": moment("2016-08-16T08:00:00.000Z"),
          "dateEnd": moment("2016-08-18T20:59:59.999Z")
        };

        let date = {
          "date": moment("2016-08-15T21:00:00.000Z"),
          "weekend": false,
          "current": false,
          "opened": {
            "first": true,
            "last": false
          },
          "availability": [
            {
              "busy": true,
              "_last": moment("2016-08-16T07:59:00.000Z"),
              "$$hashKey": "object:133"
            }
          ],
          "price": null,
          "specificPrice": null,
          "selected": true,
          "unbroken": false,
          "_first": moment("2016-08-16T08:00:00.000Z"),
          "_last": false
        };

        expect(false).toBe(CalendarService.checkAvailability(date, period));
      });

      it('should return false when selected period not overlaps with busy date (partly busy day - first availability)', () => {
        let period = {
          "dateStart": moment("2016-08-06T21:00:00.000Z"),
          "dateEnd": moment("2016-08-08T20:00:59.999Z")
        };

        let date = {
          "date": moment("2016-08-07T21:00:00.000Z"),
          "weekend": false,
          "current": false,
          "opened": {
            "first": false,
            "last": true
          },
          "availability": [
            {
              "busy": true,
              "_first": moment("2016-08-08T20:01:00.000Z"),
              "$$hashKey": "object:90"
            }
          ],
          "price": null,
          "specificPrice": null,
          "selected": true,
          "unbroken": false,
          "_first": false,
          "_last": moment("2016-08-08T20:00:59.999Z")
        };

        expect(false).toBe(CalendarService.checkAvailability(date, period));
      });
    });
  });
});
