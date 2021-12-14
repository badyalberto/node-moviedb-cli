const ora = require("ora");

dots = {
  interval: 80,
  frames: ["( ●    )", "(  ●   )", "(   ●  )", "(    ● )", "(     ●)", "(    ● )", "(   ●  )", "(  ●   )", "( ●    )", "(●     )"],
};

function getSpinner(text = "Fetching...", color = "yellow",transition = dots) {
  const spinner = ora().start();
  spinner.color = color;
  spinner.text = text;
  spinner.spinner = transition;
  return spinner;
}

function getSpinnerError(message = 'Error'){
  return ora().fail(message)
}

function getSpinnerSuccess(message = 'Success'){
  return ora().succeed(message);
}
module.exports = {
      getSpinner,getSpinnerError,getSpinnerSuccess
}
