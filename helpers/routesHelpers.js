const moment = require("moment");

// Function to initialize the formatted stats array for a given period. For now,
// manually declared.
function initializeStatsArray(period) {
  switch (period) {
    case "week":
      const weekdaysShort = moment.weekdaysShort();
      return weekdaysShort.map(weekday => {
        return { x: weekday, y: 0 };
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

  if (period === "week") {
    data.forEach(update => {
      const weekdayNumber = moment(update.timestamp).weekday();
      statsArray[weekdayNumber].y += update.numPagesRead;
    });
  } else if (period === "year") {
    data.forEach(update => {
      const monthNumber = moment(update.timestamp).month();
      statsArray[monthNumber].y += update.numPagesRead;
    });
  }

  return statsArray;
}

module.exports = { getFormattedStatsByPeriod };
