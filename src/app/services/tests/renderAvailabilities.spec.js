import dates from './test-data/date-list.js';
import availabilities from './test-data/availabilities.js';
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
      CalendarService.dates = dates;
      CalendarService.availabilities = availabilities;
    }));

    describe('isInUnbroken method', () => {
      
    });
  });
});
