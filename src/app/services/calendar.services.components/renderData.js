export default function renderData (prices, availabilities) {
  this.pricingRules = prices;
  this.availabilities = availabilities;

  this.clearData();

  if(prices)
    this.renderPrices();

  if(availabilities) {
    this.renderAvailabilities();
  }
}
