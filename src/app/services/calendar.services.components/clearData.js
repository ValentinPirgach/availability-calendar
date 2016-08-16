export default function clearData () {
  return _.forEach(this.dates, (date) => {
    date.availability = [];
    date.price = null;
    date.specificPrice = null;
  });
}
