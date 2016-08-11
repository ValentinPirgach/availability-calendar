if(!process.env.production) {
  var _ = require('lodash');
  var moment = require('moment/moment.js');
}

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
