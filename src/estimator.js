const impactCalculation = require('./lib/impactCalculation');

const covid19ImpactEstimator = (data) => {
  const impact = impactCalculation(data);
  const severeImpact = impactCalculation(data, 'severe');
  return { data, impact, severeImpact };
};

module.exports = covid19ImpactEstimator;
