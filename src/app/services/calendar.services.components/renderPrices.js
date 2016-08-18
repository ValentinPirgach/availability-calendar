let sortByPriorityAndId = (pricingRules) => {
  return pricingRules.sort((priceA, priceB) => {
    if(priceA.priority === priceB.priority) return priceA.id - priceB.id;
    return priceB.priority - priceA.priority;
  });
};

/**
 * Viewing prices in cells
 **/
export default function renderPrices () {
  let regular = sortByPriorityAndId(_.filter(this.pricingRules, {type: 'RegularRule'}));
  let specific = sortByPriorityAndId(_.filter(this.pricingRules, {type: 'SpecificRule'}));

  _.forEach(this.dates, (date) => {
    this.setRegularPrice(date, regular);
    this.setSpecificPrice(date, specific);
  });

  return this;
}
