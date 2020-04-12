const utils = require('./covid-utils');

const calculateImpact = (data, severity = '') => {
  const days = utils.duration(data.periodType, data.timeToElapse);

  const infectedCurrently = utils.currentlyInfected(data.reportedCases, severity);

  const requestedInfections = utils.infectionsByRequestedTime(days, infectedCurrently);

  const severeCases = utils.severeCasesByRequestedTime(requestedInfections);

  const hospitalBeds = utils.hospitalBedsByRequestedTime(data.totalHospitalBeds,
    severeCases);

  const icuCases = utils.casesForICUByRequestedTime(requestedInfections);

  const ventilatorCases = utils.casesForVentilatorsByRequestedTime(
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
    hospitalBedsByRequestedTime: hospitalBeds,
    severeCasesByRequestedTime: severeCases,
    casesForICUByRequestedTime: icuCases,
    casesForVentilatorsByRequestedTime: ventilatorCases,
    dollarsInFlight: moneyLost
  };

  return output;
};

module.exports = calculateImpact;
