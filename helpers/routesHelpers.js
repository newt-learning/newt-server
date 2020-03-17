const moment = require("moment");

// Function to initialize the formatted stats array for a given period. For now,
// manually declared.
function initializeStatsArray(period) {
  switch (period) {
    case "week":
      return [
        { x: "Sun", y: 0 },
        { x: "Mon", y: 0 },
        { x: "Tue", y: 0 },
        { x: "Wed", y: 0 },
        { x: "Thu", y: 0 },
        { x: "Fri", y: 0 },
        { x: "Sat", y: 0 }
      ];
    default:
      return null;
  }
}

// Function to return reading stats aggregated for given period (by week, month, etc).
function getFormattedStatsByPeriod(data, period) {
  const statsArray = initializeStatsArray(period);

  if (period === "week") {
    data.forEach(update => {
      const dayNumber = moment(update.timestamp).weekday();
      statsArray[dayNumber].y += update.numPagesRead;
    });
  }

  return statsArray;
}

module.exports = { getFormattedStatsByPeriod };
