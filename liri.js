require("dotenv").config();
var Spotify = require("node-spotify-api")
var request = require("request")

var fs = require("fs")

const keys = require('./keys.js');

var spotify = new Spotify(keys.spotify);

var programToRun = process.argv[2]
var action = process.argv[3]
if (programToRun === "spotify-this-song") {
    spotifyThisSong(action)
} else if (programToRun === "concert-this") {
    concertThis(action);
} else if (programToRun === "movie-this") {
    movieThis(action)
} else if (programToRun === "do-what-it-says") {
    doWhatItSays()

} else {
    console.log("please enter valid prog")
}

function spotifyThisSong(song) {
    if (song) {
        var song = song
    } else {
        var song = "Hit the Road Jack"
    }
    spotify.search({ type: 'track', query: song }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data.tracks.items[0].artists.name);
        console.log(data.tracks.items[0].name);
        console.log(data.tracks.items[0].external_urls.spotify);
        console.log(data.tracks.items[0].album.name);
    });
}

function concertThis(artist) {
    if (artist) {
        var artist = artist
    } else {
        var artist = "beyonce"
    }
    request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp", function (err, response, body) {
        var result = JSON.parse(body);
               if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log(result[0].venue.name)
        console.log(result[0].venue.city)
        console.log(result[0].datetime)

    })
}

function movieThis(movie) {
    if (movie) {
        var movie = movie
    } else {
        var movie = "Thor"
    }
    request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=full&tomatoes=true&apikey=trilogy", function (err, response, body) {
        var result = JSON.parse(body);
                if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log(result.Title)
        console.log(result.Year)
        console.log(result.imdbRating)
        console.log(result.Ratings[1].Value)
        console.log(result.Country)
        console.log(result.Language)
        console.log(result.Plot)
        console.log(result.Actors)
    })
}

function doWhatItSays() {
   fs.readFile("random.txt", "utf8", function (err, data) {
        var result = data.split(",")
        console.log(result)
    })

    
}



