var fs = require("fs");

function savePersons(json) {
  const buf = Buffer.from(JSON.stringify(json));
  fs.writeFile(`${__dirname}/persons/popular-persons.txt`, buf, (err) => {
    // throws an error, you could also catch it here
    if (err) throw err;
    // success case, the file was saved
    console.log("Persons Stored!");
  });
}

module.exports = { savePersons };
