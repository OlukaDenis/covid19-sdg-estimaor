const utils = require('./covid-utils');

const calculateImpact = (data, severity = '') => {
  const days = utils.duration(data.periodType, data.timeToElapse);

  const infectedCurrently = utils.currentlyInfected(data.reportedCases, severity);

  const requestedInfections = utils.infectionsByRequestedTime(days, infectedCurrently);

  const severeCasesByRequestTime = utils.severeCasesByRequestedTime(requestedInfections);

  const hospitalBedsByRequestedTime = utils.hospitalBedsByRequestedTime(data.totalHospitalBeds,
    severeCasesByRequestTime);

  const casesForICUByRequestedTime = utils.casesForICUByRequestedTime(requestedInfections);

  const casesForVentilatorsByRequestedTime = utils.casesForVentilatorsByRequestedTime(
    requestedInfections
  );

  const moneyLost = utils.dollarsInFlight(
    requestedInfections,
    data.region.avgDailyIncomeInUSD,
    data.region.avgDailyIncomePopulation,
    days
  );

  const output = {
    currentlyInfected: infectedCurrently,
    infectionsByRequestedTime: requestedInfections,
    hospitalBeds: hospitalBedsByRequestedTime,
    icuCases: casesForICUByRequestedTime,
    ventilatorCases: casesForVentilatorsByRequestedTime,
    dollarsInFlight: moneyLost
  };

  return output;
};

module.exports = calculateImpact;
