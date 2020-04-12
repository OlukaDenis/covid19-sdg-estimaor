const utils = require('./covid-utils');
const data = require('./data');
const location = require('./region');

const calculateImpact = (mdata, severity = '') => {
  // const {
  //   region,
  //   periodType,
  //   timeToElapse,
  //   reportedCases,
  //   totalHospitalBeds
  // } = data;

  this.mdata = data;

  const days = utils.duration(mdata.periodType, mdata.timeToElapse);

  const infectedCurrently = utils.currentlyInfected(mdata.reportedCases, severity);

  const infectionsByRequestedTime = utils.infectionsByRequestedTime(days, infectedCurrently);

  const severeCasesByRequestTime = utils.severeCasesByRequestedTime(infectionsByRequestedTime);

  const hospitalBedsByRequestedTime = utils.hospitalBedsByRequestedTime(mdata.totalHospitalBeds,
    severeCasesByRequestTime);

  const casesForICUByRequestedTime = utils.casesForICUByRequestedTime(infectionsByRequestedTime);

  const casesForVentilatorsByRequestedTime = utils.casesForVentilatorsByRequestedTime(
    infectionsByRequestedTime
  );

  const moneyLost = utils.dollarsInFlight(
    infectionsByRequestedTime,
    mdata.region.avgDailyIncomeInUSD,
    mdata.region.avgDailyIncomePopulation,
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

// const l = location('africa', 20, 1.5, 6.7);

// const m = data(l, 'months', 3, 67890, 1324567890, 65);

// console.log(calculateImpact(m));