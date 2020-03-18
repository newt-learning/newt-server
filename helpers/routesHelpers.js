const moment = require("moment");

// Function to initialize the formatted stats array for a given period. For now,
// manually declared.
function initializeStatsArray(period) {
  switch (period) {
    case "day":
      return [{ contentType: "Books", value: 0, unit: "pages read" }];
    case "week":
      const weekdaysShort = moment.weekdaysShort();
      return weekdaysShort.map(weekday => {
        return { x: weekday, y: 0 };
      });
    case "month":
      // Get number of days in the month
      const daysInMonth = moment().daysInMonth();
      // Init. array which will have all days (0, 1, ... , 28/29/30/31)
      const allDaysInMonth = [];
      // Populate array
      for (i = 0; i < daysInMonth; i++) {
        allDaysInMonth.push(i + 1);
      }

      return allDaysInMonth.map(dayNum => {
        return { x: String(dayNum), y: 0 };
      });
    case "year":
      const monthsShort = moment.monthsShort();
      return monthsShort.map(month => {
        return { x: month, y: 0 };
      });
    default:
      return null;
  }
}

// Function to return reading stats aggregated for given period (by week, month, etc).
function getFormattedStatsByPeriod(data, period) {
  const statsArray = initializeStatsArray(period);

  switch (period) {
    case "day":
      data.forEach(update => {
        if (update.contentType === "book") {
          statsArray[0].value += update.numPagesRead;
        }
      });
      return statsArray;
    case "week":
      data.forEach(update => {
        const weekdayNumber = moment(update.timestamp).weekday();
        statsArray[weekdayNumber].y += update.numPagesRead;
      });
      return statsArray;
    case "month":
      data.forEach(update => {
        const dayOfMonth = moment(update.timestamp).date();
        statsArray[dayOfMonth - 1].y += update.numPagesRead;
      });
      return statsArray;
    case "year":
      data.forEach(update => {
        const monthNumber = moment(update.timestamp).month();
        statsArray[monthNumber].y += update.numPagesRead;
      });
      return statsArray;
    default:
      return statsArray;
  }
}

module.exports = { getFormattedStatsByPeriod };
