/**
* Viewing regular price
**/
export default function setRegularPrice (date, prices) {
  _.forEach(prices, (price) => {
    price.startDate = price.startDate || moment().startOf('day');
    price.endDate = price.endDate || moment().year(2056).startOf('day');

    if (moment(date.date).isBetween(price.startDate, price.endDate, null, '[]')) {
      //weekend price
      if (this.isWeekend(date.date)) {
        date.price = price.perDayWkndAmount;
      } else {
        date.price = price.perDayWdAmount;
      }
    }
  });
}
