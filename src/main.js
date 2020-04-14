const covid19ImpactEstimator = require('./estimator');


const render = () => {
  const population = document.querySelector('[data-population]').value;
  const timeToElapse = document.querySelector('[data-time-to-elapse]').value;
  const reportedCases = document.querySelector('[data-reported-cases]').value;
  const totlHospitalBeds = document.querySelector('[data-total-hospital-beds]').value;
  const periodType = document.querySelector('[data-period-type]').value;

};

const submitData = document.querySelector('[data-go-estimate]');
submitData.addEventListener('click', () => render());

