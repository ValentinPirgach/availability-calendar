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
    }));

    describe('setEnd (updateEnd) method', () => {
      // beforeEach(() => {
      //   CalendarService.setStart({date: moment("2016-09-03T21:00:00.000Z")});
      // });

      it('should return sorted by date array', () => {
        let sorted = CalendarService.sortDates([moment("2016-09-03T21:00:00.000Z"), moment("2016-08-20T21:00:00.000Z")]);
        expect(sorted[0].isBefore(sorted[1])).toBe(true);
      });
    });
  });
});
