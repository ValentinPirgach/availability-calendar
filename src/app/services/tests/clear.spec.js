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

    describe('clear method', () => {

      it('should set specified date object keys to false', () => {
        let date = {
          selected: true,
          busy:     true,
          unbroken: true,
          opened: {
            first:  true,
            last:   true
          },
          _first:   true,
          _last:    true,
        };

        let dateTest = {
          selected: false,
          busy:     false,
          unbroken: false,
          opened: {
            first:  false,
            last:   false
          },
          _first:   false,
          _last:    false,
        };

        expect(dateTest).toEqual(CalendarService.clear(date));
      });
    });
  });
});
