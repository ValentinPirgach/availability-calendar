//vendors
import angular from 'angular';
import ngAnimate from 'angular-animate';

//Styles
import './styles/calendar.scss';

//controllers
import CalendarCtrl from './controllers/calendar-ctrl.js';

//services
import CalendarService from './services/calendar.service.js';

//directives
import availabilityCalendar from './directives/availablity-calendar.js';
import calendarInfiniteScroll from './directives/calendar-infinite-scroll.js';

const MODULE_NAME = 'app';

angular
  .module(MODULE_NAME, [ngAnimate])
  //services
  .service('CalendarService', CalendarService)
  //controllers
  .controller('CalendarCtrl', CalendarCtrl)
  //directives
  .directive('availabilityCalendar', availabilityCalendar)
  .directive('calendarInfiniteScroll', calendarInfiniteScroll)
;

export default MODULE_NAME;
