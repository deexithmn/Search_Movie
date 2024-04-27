var express = require("express");
var request = require("request");
var bodyParser = require("body-parser");


var app = express();
var dataPasrsed;
var movieName;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", function (req, res) {
    res.render("home")
});

app.post("/ratings", function (req, res) {
    movieName = req.body.movieName;
    var apikey = "6b357b0b";
    var url = "http://www.omdbapi.com/?s=" + movieName + "&apikey=" + apikey;
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            dataPasrsed = JSON.parse(body);
            res.redirect("/ratingsResult");
        }
    });
});

app.get("/ratingsResult", function (req, res) {
    if (dataPasrsed["Error"] === "Movie not found!") {
        res.render("error.ejs", {
            varMovie: movieName
        })
    } else {
        res.render("result", {
            dataPasrsed: dataPasrsed
        });
    }
});


app.listen(3000, function () {
    console.log("Server Running!!")
});