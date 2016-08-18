//vendors
let modules = [];

if(process.env.npm_lifecycle_event === 'server') {
  require('bootstrap-sass/eyeglass-exports');
  require('./styles/bootstrap.scss');
  require('angular');
  modules.push(require('angular-animate'));
  var _ = require('lodash');
  var moment = require('moment/moment.js');
}

if(process.env.npm_lifecycle_event === 'server' || process.env.npm_lifecycle_event === 'build') {
  //eonasdan-bootstrap-datetimepicker
  require('eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css');
  require('eonasdan-bootstrap-datetimepicker/src/js/bootstrap-datetimepicker.js');
  require('./styles/calendar.scss');
  require('./styles/datetimepicker.scss');
}

//controllers
import CalendarCtrl from './controllers/calendar-ctrl.js';
import TimepickerCtrl from './controllers/timepicker-ctrl.js';
import CheckDatesCtrl from './controllers/check-dates-ctrl.js';
import CalendarTestCtrl from './controllers/calendar-test-ctrl.js';
import DateTimePickerCtrl from './controllers/date-time-picker-ctrl.js';

//services
import CalendarService from './services/calendar.service.js';

//directives
import availabilityCalendar from './directives/availablity-calendar.js';
import calendarInfiniteScroll from './directives/calendar-infinite-scroll.js';
import cellTimepicker from './directives/cell-timepicker.js';
import mouseOver from './directives/mouse-over.js';
import showPicker from './directives/show-picker.js';
import cellDatepicker from './directives/cell-datepicker.js';
import checkerDates from './directives/check-dates.js';
import dateTimePicker from './directives/datetimepicker.js';

const MODULE_NAME = 'availabilityCalendar';

angular
  .module(MODULE_NAME, modules)
  //services
  .service('CalendarService', CalendarService)
  //controllers
  .controller('CalendarCtrl', CalendarCtrl)
  .controller('TimepickerCtrl', TimepickerCtrl)
  .controller('CheckDatesCtrl', CheckDatesCtrl)
  .controller('CalendarTestCtrl', CalendarTestCtrl)
  .controller('DateTimePickerCtrl', DateTimePickerCtrl)
  //directives
  .directive('availabilityCalendar', availabilityCalendar)
  .directive('calendarInfiniteScroll', calendarInfiniteScroll)
  .directive('cellTimepicker', cellTimepicker)
  .directive('mouseOver', mouseOver)
  .directive('showPicker', showPicker)
  .directive('cellDatepicker', cellDatepicker)
  .directive('checkerDates', checkerDates)
  .directive('dateTimePicker', dateTimePicker)
;

export default MODULE_NAME;
