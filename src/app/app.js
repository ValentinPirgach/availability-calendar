//vendors
if(!process.env.production) {
  require('bootstrap-sass/eyeglass-exports');
  require('angular');
  var _ = require('lodash');
  var moment = require('moment/moment.js');
}

//Styles
import './styles/calendar.scss';

//controllers
import CalendarCtrl from './controllers/calendar-ctrl.js';
import TimepickerCtrl from './controllers/timepicker-ctrl.js';

import MainCtrl from './controllers/main-ctrl.js';

//services
import CalendarService from './services/calendar.service.js';

//directives
import availabilityCalendar from './directives/availablity-calendar.js';
import calendarInfiniteScroll from './directives/calendar-infinite-scroll.js';
import timepicker from './directives/timepicker.js';
import mouseOver from './directives/mouse-over.js';
import showPicker from './directives/show-picker.js';

const MODULE_NAME = 'availabilityCalendar';

angular
  .module(MODULE_NAME, [])
  //services
  .service('CalendarService', CalendarService)
  //controllers
  .controller('CalendarCtrl', CalendarCtrl)
  .controller('TimepickerCtrl', TimepickerCtrl)
  .controller('MainCtrl', MainCtrl)
  //directives
  .directive('availabilityCalendar', availabilityCalendar)
  .directive('calendarInfiniteScroll', calendarInfiniteScroll)
  .directive('timepicker', timepicker)
  .directive('mouseOver', mouseOver)
  .directive('showPicker', showPicker)
;

export default MODULE_NAME;
