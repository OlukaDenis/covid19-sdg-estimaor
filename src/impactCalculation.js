const utils = require('./covid-utils');

const calculateImpact = (data, severity = '') => {
  const days = utils.duration(data.periodType, data.timeToElapse);

  const infectedCurrently = utils.currentlyInfected(data.reportedCases, severity);

  const infectionsByRequestedTime = utils.infectionsByRequestedTime(days, infectedCurrently);

  const severeCasesByRequestTime = utils.severeCasesByRequestedTime(infectionsByRequestedTime);

  const hospitalBedsByRequestedTime = utils.hospitalBedsByRequestedTime(data.totalHospitalBeds,
    severeCasesByRequestTime);

  const casesForICUByRequestedTime = utils.casesForICUByRequestedTime(infectionsByRequestedTime);

  const casesForVentilatorsByRequestedTime = utils.casesForVentilatorsByRequestedTime(
    infectionsByRequestedTime
  );

  const moneyLost = utils.dollarsInFlight(
    infectionsByRequestedTime,
    data.region.avgDailyIncomeInUSD,
    data.region.avgDailyIncomePopulation,
    days
  );

  const output = {
    currentlyInfected: infectedCurrently,
    requestedInfections: infectionsByRequestedTime,
    hospitalBeds: hospitalBedsByRequestedTime,
    icuCases: casesForICUByRequestedTime,
    ventilatorCases: casesForVentilatorsByRequestedTime,
    dollarsInFlight: moneyLost
  };

  return output;
};

module.exports = calculateImpact;
