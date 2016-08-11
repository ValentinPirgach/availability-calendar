if(!process.env.production) {
  var _ = require('lodash');
  var moment = require('moment/moment.js');
}
/**
* Viewing special price
**/
export default function setSpecificPrice (date, prices) {
  _.forEach(prices, (price) => {
    price.startDate = moment(price.startDate || moment()).startOf('day');
    price.endDate = moment(price.endDate || moment().year(2056)).startOf('day');

    if (moment(date.date).isBetween(price.startDate, price.endDate, null, '[]')) {
      if (price.percentages) {
        _.assign(date, {specificPrice: {price: price.perDayAmount / 100 * date.price}});
      }
      else {
        _.assign(date, {specificPrice: {price: price.perDayAmount}});
      }

      _.assign(date.specificPrice, {
        unbroken: !price.broken,
        _first: date.date.isSame(price.startDate, 'day'),
        _last: date.date.isSame(price.endDate, 'day')
      });
    }
  });
}
