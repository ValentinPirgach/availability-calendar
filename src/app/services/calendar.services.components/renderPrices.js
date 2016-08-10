/**
 * Viewing prices in cells
 **/
export default function renderPrices () {
  _.forEach(this.dates, (date) => {
    this.setRegularPrice(date, _.filter(this.pricingRules, {type: 'RegularRule'}));
    this.setSpecificPrice(date, _.filter(this.pricingRules, {type: 'SpecificRule'}));
  });

  return this;
}
