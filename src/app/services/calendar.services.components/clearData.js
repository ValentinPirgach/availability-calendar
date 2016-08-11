export default function clearData () {
  _.forEach(this.dates, (date) => {
    date.availability = [];
    date.price = null;
    date.specificPrice = null;
  });
}
