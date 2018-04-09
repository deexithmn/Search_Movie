var express = require("express");
var request = require("request");
var bodyParser = require("body-parser");
var window = require("js-alert");

 


var app = express();
var dataPasrsed;
var movieName;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/",function(req,res){
   res.render("home")
});


app.post("/ratings",function(req,res){
    movieName = req.body.movieName;
    // console.log(movieName);
    var apikey = "thewdb";
    var url = "http://www.omdbapi.com/?s="+movieName+"&apikey="+apikey;
    console.log(url);
   request(url,function(error,response,body){
       if(!error && response.statusCode == 200){
            dataPasrsed = JSON.parse(body);
            res.redirect("/ratingsResult");
       }
   });
});

app.get("/ratingsResult",function(req,res){
    if(dataPasrsed["Error"]=== "Movie not found!"){
        res.render("error.ejs",{varMovie:movieName})
        // window.alert(movieName +" is'nt a real movie!!");
        // res.redirect("/");
    }else {
    
    res.render("result",{dataPasrsed:dataPasrsed});
    }
});


// Chage the port address here
app.listen(3000,function(){
    console.log("Server Running!!")
    console.log("Local Host:3000");
});