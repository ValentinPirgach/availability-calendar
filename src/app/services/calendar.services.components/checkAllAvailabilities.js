export default function checkAllAvailabilities (period) {
	for(let i in this.availabilities) {
		let avail = this.availabilities[i];

		if((moment(avail.startDateNy).isBetween(period.dateStart, period.dateEnd, 'minutes', '[]') ||
				moment(avail.endDateNy).isBetween(period.dateStart, period.dateEnd, 'minutes', '[]')) ||
      (moment(period.dateStart).isBetween(avail.startDateNy, avail.endDateNy, 'minutes', '[]') ||
      moment(period.dateEnd).isBetween(avail.startDateNy, avail.endDateNy, 'minutes', '[]'))) {
			return true;
		}
	}
}
