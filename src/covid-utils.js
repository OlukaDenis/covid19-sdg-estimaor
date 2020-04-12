'use-strict';

const currentlyInfected = (reportedCases, severity = '') => {
  if (severity === 'severe') {
    return reportedCases * 50;
  }
  return reportedCases * 10;
};

const infectionsByRequestedTime = (days, currentInfections) => {
  const factor = Math.floor(days / 3);
  return currentInfections * (2 ** factor);
};

const duration = (periodType, period) => {
  let days = 0;
  if (periodType === 'days') {
    days = period;
  } else if (periodType === 'weeks') {
    days = 7 * period;
  } else if (periodType === 'months') {
    days = 30 * period;
  } else {
    return days;
  }
  return days;
};

const severeCasesByRequestedTime = (requestedTimeInfections) => {
  Math.floor(0.25 * requestedTimeInfections);
};

const hospitalBedsByRequestedTime = (totalHospitalBeds, requestedTimeSevereCases) => {
  const bedsAvailable = totalHospitalBeds * 0.35;
  return bedsAvailable - requestedTimeSevereCases;
};

const casesForICUByRequestedTime = (requestedTimeInfections) => {
  Math.floor(0.05 * requestedTimeInfections);
};

const casesForVentilatorsByRequestedTime = (requestedTimeInfections) => {
  Math.floor(0.02 * requestedTimeInfections);
};

const dollarsInFlight = (requestedTimeInfections, avgDailyIncome, avgPopulationIncome, days) => {
  const moneyLost = requestedTimeInfections * avgPopulationIncome * avgDailyIncome * days;
  return Math.floor(moneyLost);
};

module.exports = {
  currentlyInfected,
  infectionsByRequestedTime,
  duration,
  severeCasesByRequestedTime,
  hospitalBedsByRequestedTime,
  casesForICUByRequestedTime,
  casesForVentilatorsByRequestedTime,
  dollarsInFlight
};
