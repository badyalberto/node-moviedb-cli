const chalk = require("chalk");
const log = console.log;

function renderPersons(json) {
  json.results.forEach((person) => {
    log(chalk.white("---------------------------- \n\n"));
    log(chalk.white("PERSON \n"));
    log(chalk.white("---------------------------- \n"));
    log(chalk.white(`ID : ${person.id}`));
    log(chalk.white("Name:"), chalk.bold.blue(`${person.name}`));
    if (person.known_for_department) log(chalk.white("Department:"), chalk.magenta(`${person.known_for_department}\n`));
    if (!person.known_for.some((movie) => movie.title)) {
      log(chalk.red(`${person.name} doesn't appear in any movie\n`));
    } else {
      log(chalk.green("Appearing in movies:\n\n"));
      person.known_for.forEach((movie) => {
        if (movie.title !== undefined) log(chalk.white(`\tMovie:\n\tID: ${movie.id}\n\tRelease Date: ${movie.release_date}\n\tTitle:${movie.title}\n`));
      });
    }
  });
  renderPages(json.page, json.total_pages);
}

function renderPerson(json) {
  log(chalk.white("----------------------------\nPerson: \n"));
  log(chalk.white(`ID : ${json["id"]}`));
  log(chalk.white("Name:"), chalk.bold.blue(`${json["name"]}`));
  log(chalk.white(`Birthday: ${json["birthday"]}`), chalk.gray("|"), chalk.white(`${json["place_of_birth"]}`));
  if (json["known_for_department"]) log(chalk.white("Name:"), chalk.bold.magenta(`${json["known_for_department"]}`));
  log(chalk.white("Name:"), chalk.bold.blue(`${json["biography"]}`));
  if (json["also_known_as"].length === 0) log(chalk.yellow(`\n${json["name"]}`), chalk.white(" doesn’t have any alternate names\n"));
  else {
    log(chalk.white(`\nAlso known as:\n`));
    json["also_known_as"].forEach((name) => {
      log(chalk.white(`${name}`));
    });
  }
}

function renderMovies(json) {
  json.results.forEach((movie) => {
    log(chalk.white("----------------------------\nMovie: \n"));
    log(chalk.white(`ID: ${movie.id}`));
    log(chalk.white("Title:"), chalk.bold.blue(movie.title));
    log(chalk.white(`Release Date: ${movie.release_date}\n`));
  });
  renderPages(json.page, json.total_pages);
}

function renderMovie(movie, review) {
  if (!review) {
    log(chalk.white("----------------------------\nMovie: \n"));
    log(chalk.white(`ID: ${movie.id}`));
    log(chalk.white("Title:"), chalk.bold.blue(movie.title));
    log(chalk.white(`Release Date: ${movie.release_date}`));
    log(chalk.white(`Runtime: ${movie.runtime}`));
    log(chalk.white(`Release Date: ${movie.vote_count}`));
    log(chalk.white(`Overview: ${movie.overview}\n`));
    log(chalk.white(`Genres:\n`));
    if (movie.genres.length === 0) log(chalk.yellow(`The movie doesn’t have a declared genre\n`));
    else {
      movie.genres.forEach((genre) => {
        log(chalk.white(genre.name));
      });
      log(chalk.white("\n"));
    }
    if (movie.spoken_languages.length === 0) log(chalk.yellow(`The movie: ${movie.id} doesn’t have any declared languages`));
    else {
      movie.spoken_languages.forEach((genre) => {
        log(chalk.white(genre.name));
      });
    }
  } else {
    if (movie.results.length === 0) log(chalk.yellow(`The movie: ${movie.id} doesn’t have any reviews`));
    else {
      movie.results.forEach((review) => {
        log(chalk.white("-----------------------------------------"));
        log(chalk.white("\nAuthor:"), chalk.bold.blue(`${review.author}`));
        log(chalk.white(`Content: ${renderContent(review.content)}\n`));
      });

      if (movie.total_pages > movie.page) renderPages(movie.page, movie.total_pages);
    }
  }
}

function renderPages(page, total_pages) {
  if (page < total_pages) log(chalk.white(`---------------------------- \nPage: ${page} of: ${total_pages}\n`));
}

function renderContent(content) {
  if (content.length > 400) {
    return content.slice(0, 400) + " ...";
  }
  return content;
}

module.exports = { renderPersons, renderPerson, renderMovies, renderMovie };
