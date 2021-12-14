#!/usr/bin/env node

const { Command } = require("commander");
const ora = require("ora");
const https = require("https");
const { renderPersons, renderPerson } = require("./renders");
const { getMovies, getPersons, getPerson, getMovie } = require("./requests");
const { getSpinner } = require("./spinner");
const { supportsColor } = require("chalk");

require("dotenv").config();

const program = new Command();
program.version("0.0.1");
const log = console.log;

dots = {
  interval: 80,
  frames: ["( ●    )", "(  ●   )", "(   ●  )", "(    ● )", "(     ●)", "(    ● )", "(   ●  )", "(  ●   )", "( ●    )", "(●     )"],
};

program
  .command("get-persons")
  .description("Make a network request to fetch most popular persons")
  .requiredOption("-p, --popular", "Fetch the popular persons")
  .requiredOption("--page <num>", "The page of persons data results to fetch")
  .option("--save","Saved File")
  .action((options) => {
    const spinner = getSpinner("Fetching the persons data...", "yellow");
    const optionsPath = new URL(`https://api.themoviedb.org/3/person/popular?api_key=${process.env.API_KEY}&page=${options.page}`);
    getPersons(optionsPath, spinner,options.save);
  });

program
  .command("get-person")
  .description("Make a network request to fetch the data of a single person")
  .requiredOption("-i, --id <num>", "The id of the person")
  .action((options) => {
    const spinner = getSpinner("Fetching the person data...", "yellow");
    const optionsPath = new URL(`https://api.themoviedb.org/3/person/${options.id}?api_key=${process.env.API_KEY}`);
    getPerson(optionsPath, spinner);
  });

program
  .command("get-movies")
  .description("Make a network request to fetch movies")
  .requiredOption("--page <num>", "The page of movies data results to fetch")
  .option("-p, --popular", "Fetch the popular movies")
  .option("-n, --now-playing", "Fetch the movies that are playing now")
  .action((options) => {
    const spinner = getSpinner("Fetching the movies data...", "yellow");
    let path = "";

    if (!options.nowPlaying) path = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&page=${options.page}`;
    else path = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.API_KEY}&page=${options.page}`;
    getMovies(path, spinner);
  });

program
  .command("get-movie")
  .description("Make a network request to fetch the data of a single person")
  .requiredOption("-i,--id <num>", "The id of the movie")
  .option("-r, --reviews", "Fetch the reviews of the movie")
  .action((options) => {
    const spinner = getSpinner("Fetching the movie data...", "yellow");
    let path = "";
    if (options.reviews) {
      path = `https://api.themoviedb.org/3/movie/${options.id}/reviews?api_key=${process.env.API_KEY}`;
      getMovie(path, spinner,true);
    } else {
      path = `https://api.themoviedb.org/3/movie/${options.id}?api_key=${process.env.API_KEY}`;
      getMovie(path, spinner,false);
    }
  });

// error on unknown commands

program.parse(process.argv);
