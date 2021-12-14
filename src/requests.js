const { renderMovies, renderPersons, renderPerson, renderMovie } = require("./renders");
const https = require("https");
const { getSpinnerError, getSpinnerSuccess } = require("./spinner");
const { savePersons } = require("./save");
const { getNotify } = require("./notifier");

function getMovies(path, spinner) {
  setTimeout(() => {
    const req = https.request(path, (res) => {
      let body = "";

      res.on("data", (chunk) => {
        body += chunk;
      });

      res.on("end", () => {
        const json = JSON.parse(body);

        if (res.statusCode !== 200) {
          getSpinnerError(json.status_message);
          return;
        }
        renderMovies(json);
        getSpinnerSuccess("Popular movies data loaded");

        //console.log(json);
      });
    });

    req.on("error", (e) => {
      console.error(e);
    });

    req.end();
    spinner.stop();
  }, 2000);
}

function getPersons(path, spinner, save) {
  setTimeout(() => {
    const req = https.request(path, (res) => {
      //console.log("statusCode:", res.statusCode);
      //console.log("headers:", res);

      let body = "";
      res.on("data", (chunk) => {
        body += chunk;
      });

      res.on("end", () => {
        const json = JSON.parse(body);

        if (res.statusCode !== 200) {
          getSpinnerError(json.status_message);
          return;
        }
        if (save) {
          savePersons(json.results);
          getNotify("Stored Persons","Succesful Persons");
        } else {
          renderPersons(json);
          getSpinnerSuccess("Popular Persons data loaded");
        }
      });
    });
    req.on("error", (e) => {
      console.error("aaaa");
    });
    req.end();
    spinner.stop();
  }, 2000);
}

function getPerson(path, spinner) {
  setTimeout(() => {
    const req = https.request(path, (res) => {
      let body = "";

      res.on("data", (chunk) => {
        body += chunk;
      });

      res.on("end", () => {
        const json = JSON.parse(body);

        if (res.statusCode !== 200) {
          getSpinnerError(json.status_message);
          return;
        }
        renderPerson(json);

        getSpinnerSuccess("Person data loaded");
      });
    });

    req.on("error", (e) => {
      console.error(e);
    });
    req.end();
    spinner.stop();
  }, 2000);
}

function getMovie(path, spinner, review) {
  setTimeout(() => {
    const req = https.request(path, (res) => {
      let body = "";

      res.on("data", (chunk) => {
        body += chunk;
      });

      res.on("end", () => {
        const json = JSON.parse(body);

        if (res.statusCode !== 200) {
          getSpinnerError(json.status_message);
          return;
        }
        renderMovie(json, review);

        if (!review) getSpinnerSuccess("Movie data loaded");
        else {
          getSpinnerSuccess("Movie reviews data loaded");
        }
      });
    });

    req.on("error", (e) => {
      console.error(e);
    });
    req.end();
    spinner.stop();
  }, 2000);
}

module.exports = {
  getMovies,
  getPersons,
  getPerson,
  getMovie,
};
