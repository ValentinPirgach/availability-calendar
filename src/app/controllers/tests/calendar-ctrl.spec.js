import app from '../../app';
import moment from 'moment';

describe('Calendar App', () => {

  describe('CalendarCtrl', () => {
    let CalendarCtrl, CalendarService;

    beforeEach(() => {
      angular.mock.module(app);

      CalendarService = {
        generateDates: () => {},
        loadMoreDates: () => {},
        getDayNames: () => {},
        setDates: () => {},
        setDefault: () => {}
      };

      spyOn(CalendarService, 'getDayNames').and.returnValue([]);
      spyOn(CalendarService, 'setDates');
      spyOn(CalendarService, 'loadMoreDates').and.returnValue([]);
      spyOn(CalendarService, 'generateDates').and.returnValue([]);

      angular.mock.inject(($controller) => {
        CalendarCtrl = $controller('CalendarCtrl', {CalendarService: CalendarService});
      });
    });

    describe('contructor', () => {
      it('days should be an array', () => {
        expect(CalendarCtrl.days).toEqual([]);
      });

      it('dates should be an array', () => {
        expect(CalendarCtrl.dates).toEqual([]);
      });

      it('selectedDates should be an array', () => {
        expect(CalendarCtrl.selectedDates).toEqual([]);
      });
    });

    describe('methods', () => {
      it('should return day of week for passed moment', () => {
        expect(moment().date()).toEqual(CalendarCtrl.getDate(moment()));
      });

      it('should return full month name for passed moment', () => {
        expect('October').toEqual(CalendarCtrl.getMonth(moment().month(9)));
      });

      it('should return object with keys-classes for styling secific price', () => {
        let dateObject = {
          specificPrice: {
            'price': 14.9,
            'unbroken': false,
            '_first': true,
            '_last': false
          }
        };

        let classes = CalendarCtrl.specificPriceClasses(dateObject);

        expect(true).toEqual(classes.first);
        expect(false).toEqual(classes.last);
        expect(false).toEqual(classes.unbroken);
      });
    });

    describe('cell style filling', () => {
      it('shuold return width and left position of element according daily time', () => {
        let cell = {
          'date': moment('2016-09-12T21:00:00.000Z'),
          'weekend': false,
          'current': false,
          'opened': {
            'first': false,
            'last': false
          },
          'availability': [],
          'price': 149,
          'specificPrice': null,
          'selected': true,
          'unbroken': false,
          '_first': moment('2016-09-13T03:00:00.000Z'),
          '_last': moment('2016-09-13T17:59:59.999Z')
        };
        expect({width: '62.4306%', left: '25.0000%'}).toEqual(CalendarCtrl.cellStyle(cell));
      });

      it('shuold return width (50%) and right (0) position of element according daily time', () => {
        let cell = {
          'date': moment('2016-08-21T21:00:00.000Z'),
          'weekend': false,
          'current': false,
          'opened': {
            'first': true,
            'last': false
          },
          'availability': [],
          'price': null,
          'specificPrice': null,
          'selected': true,
          'unbroken': false,
          '_first': moment('2016-08-22T09:00:00.000Z'),
          '_last': false
        };

        expect({width: '50%', right: '0'}).toEqual(CalendarCtrl.cellStyle(cell));
      });

      it('shuold return width (100%) of element according daily time', () => {
        expect({width: '100%'}).toEqual(CalendarCtrl.cellStyle({}));
      });
    });
  });
});
