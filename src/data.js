const location = require('./region');

const Data = (region, periodType, timeToElapse, reportedCases, population, totalHospitalBeds) => {
  this.region = location;
  return {
    region,
    periodType,
    timeToElapse,
    reportedCases,
    population,
    totalHospitalBeds
  };
};

module.exports = Data;
