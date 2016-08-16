export default function renderData (prices, availabilities) {
  this.pricingRules = prices;
  this.availabilities = availabilities;

  this.clearData();

  if(prices)
    this.renderPrices();

  if(availabilities) {
    this.renderAvailabilities();
  }

  if(!_.isEmpty(this.selectedPeriod))
    this.changeCallback({
      $range: this.selectedPeriod,
      $calendarErrors: this.checkForErrors(this.selectedPeriod)
    });
}
