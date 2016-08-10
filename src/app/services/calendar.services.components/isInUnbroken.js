/**
 * Check if selected period is between unbroken pricing rule
 **/
export default function isInUnbroken (period) {
  let start = period.dateStart,
      end = period.dateEnd,
      findBroken;

  for (var i in this.pricingRules) {
    let price = this.pricingRules[i];

    if (!price.broken && price.type == 'SpecificRule') {
      let priceStart = price.startDate.startOf('day'),
          priceEnd = price.endDate ? price.endDate.endOf('day') : moment().month(1).date(1).year(2056).endOf('day');

      //start of price is in selected period
      let isStartInPrice = start.isBetween(priceStart, priceEnd, 'day', '[]');

      //end of price is in selected period
      let isEndInPrice = end.isBetween(priceStart, priceEnd, 'day', '[]');

      if (isStartInPrice || isEndInPrice) {
        findBroken = price;
      }
    }
  }

  if (findBroken !== undefined) {
    var brokenStart = findBroken.startDate.startOf('day'),
        brokenEnd = findBroken.endDate ? findBroken.endDate.endOf('day') : moment().month(1).date(1).year(2056);

    if (start.isBetween(brokenStart, brokenEnd, 'minutes', '()') ||
        end.isBetween(brokenStart, brokenEnd, 'minutes', '()')) {
      return true;
    }

    return false;
  }
}
