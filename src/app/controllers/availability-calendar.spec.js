import app from '../app';
import moment from 'moment/moment';

describe('Calendar Controller', () => {
  let Calendar;

  beforeEach(() => {
    angular.mock.module(app);

    angular.mock.inject(($controller) => {
      Calendar = $controller('CalendarCtrl', {});
    });
  });

  it('should contain list of days of week, starting from SUN', () => {
    expect(Calendar.days).toEqual(['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']);
  });

  it('should return day number from passed object', () => {
    expect(Calendar.getDate(moment())).toEqual(moment().date());
    expect(Calendar.getDate(moment('10/10/1993', 'MM/DD/YYYY'))).toEqual(10);
  });

  it('should return day month STRING from passed object', () => {
    expect(Calendar.getMonth(moment())).toEqual(moment().format('MMM'));
    expect(Calendar.getMonth(moment('10/10/1993', 'MM/DD/YYYY'))).toEqual("Oct");
  });
});
