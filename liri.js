require("dotenv").config();
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var fs = require("fs");

///// BANDS IN TOWN /////
var artistInput = process.argv.slice(3).join(" ");

var queryBandsURL =
  "https://rest.bandsintown.com/artists/" +
  artistInput +
  "/events?app_id=codingbootcamp";

if (process.argv[2] === "concert-this") {
  axios.get(queryBandsURL).then(function(response) {
    console.log(`Lineup: ${response.data[0].lineup}`);
    console.log(`Location: ${response.data[0].venue.name}`);
    console.log(
      `Event Date: ${moment(response.data[0].datetime).format("lll")}`
    );
  });
}

///// OMDB /////
var movieInput = process.argv.slice(3).join(" ");
var queryMovieURL =
  "http://www.omdbapi.com/?t=" + movieInput + "&y=&plot=short&apikey=trilogy";

if (process.argv[2] === "movie-this") {
  axios.get(queryMovieURL).then(function(response) {
    console.log(`Movie Title: ${response.data.Title}`);
    console.log(`Year Released: ${response.data.Year}`);
    console.log(`IMDB Rating: ${response.data.imdbRating}`);
    console.log(`Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}`);
    console.log(`Location (Country): ${response.data.Country}`);
    console.log(`Language: ${response.data.Language}`);
    console.log(`Plot: ${response.data.Plot}`);
    console.log(`Actors: ${response.data.Actors}`);
  });

  if (!movieInput) {
    axios
      .get("http://www.omdbapi.com/?t=Mr+Nobody&y=&plot=short&apikey=trilogy")
      .then(function(response) {
        console.log(`Movie Title: ${response.data.Title}`);
        console.log(`Year Released: ${response.data.Year}`);
        console.log(`IMDB Rating: ${response.data.imdbRating}`);
        console.log(
          `Rotten Tomatoes Rating: ${response.data.Ratings[1].Value}`
        );
        console.log(`Location (Country): ${response.data.Country}`);
        console.log(`Language: ${response.data.Language}`);
        console.log(`Plot: ${response.data.Plot}`);
        console.log(`Actors: ${response.data.Actors}`);
      });
  }
}

///// SPOTIFY /////
var songInput = process.argv.slice(3).join(" ");

if (process.argv[2] === "spotify-this-song" && !songInput) {
  // spotify.search({ type: 'track', query: 'The Sign', limit: 1 }, function (err, data){
  // if (err) {
  //   return console.log('Error occurred: ' + err);
  // };
  console.log("Artist: Ace of Base");
  console.log("Song Title: The Sign");
};

function query() {
  spotify.search({ type: "track", query: songInput, limit: 10 }, function(
    err,
    data
  ) {
    if (err) {
      return console.log("Error occurred: " + err);
    } else {
      for (i = 0; i < 10; i++) {
        console.log("Artist: " + data.tracks.items[i].album.artists[i].name);
        console.log("Song Title: " + data.tracks.items[i].name);
      }
    }
  });
};

if (process.argv[2] === "spotify-this-song" && + " " + songInput) {
  query();
};

if (process.argv[2] === "do-what-it-says") {
  fs.readFile("./random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    } else {
      console.log((process.argv = "node " + "liri.js " + data.split(","))); // NOT SPLITTING
    };
  });
};
