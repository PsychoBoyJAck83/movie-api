const    express = require("express"),
         morgan = require('morgan'),
         fs = require("fs"),
         path = require("path");
const bodyParser = require('body-parser');
const app = express();

const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

mongoose
.connect("mongodb://127.0.0.1:27017/movie_api", {
useNewUrlParser: true,
useUnifiedTopology: true,
})
.then(() => {
console.log("Connected to the database!");
})
.catch((err) => {
   console.error("Failed to connect to the database:", err);
   });

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(morgan('combined', {stream: accessLogStream}));

app.use((err, req, res, next) => {
   console.error(err.stack);
   res.status(500).send('Something broke!');
 });

 app.get("/movies", (req, res) => {
   Movies.find({})
      .then((movies) => {
         res.json(movies);
      })
      .catch((error) => {
         console.error("Failed to fetch movies:", error);
         res.status(500).send("Failed to fetch movies");
      });
   });

app.get("/movies/:title", (req, res) => {
   Movies.findOne({title: req.params.title})
      .then((movie) => {
         res.json(movie);
      })
      .catch((error) => {
         console.error("Failed to fetch :" + req.params.title, error);
         res.status(500).send("Failed to fetch :" + req.params.title, error);
      });   
});

app.get("/movies/:title/genre", (req, res) => {
   Movies.findOne({title: req.params.title})
      .then((movie) => {
         res.json(movie.genre);
      })
      .catch((error) => {
         console.error("Failed to fetch :" + req.params.title + "'s genre", error);
         res.status(500).send("Failed to fetch :" + req.params.title + "'s genre", error);
      }); 
 });

app.get("/directors/:name",(req,res)=>{
   Movies.findOne({"director.name":req.params.name})
      .then((movie) => {
         res.json(movie.director);
      })
      .catch((error => {
         console.error("Failed to fetch :" + req.params.name + " info", error);
         res.status(500).send("Failed to fetch :" + req.params.name + " info", error);
      }))
});

app.post("/users",(req,res)=>{
   Users.findOne({ Username: req.body.username })
   .then((user) => {
     if (user) {
       return res.status(400).send(req.body.username + 'already exists');
     } else {
       Users
         .create({
           username: req.body.username,
           password: req.body.password,
           email: req.body.email,
           birthDate: req.body.BirthDate
         })
         .then((user) =>{res.status(201).json(user) })
       .catch((error) => {
         console.error(error);
         res.status(500).send('Error: ' + error);
       })
     }
   })
   .catch((error) => {
     console.error(error);
     res.status(500).send('Error: ' + error);
   });
   }
);

app.put("/users/update/:username/:userData/:newUserDataValue",((req,res)=>{
   res.send(`${req.params.username}s ${req.params.userData} has been updated!`);
}));

app.post("/users/:username/favorites/:movieTitle",((req,res)=>{
   res.status(201).send(`${req.params.movieTitle} has been added to the favorites list!`);
   //more to come
}));

app.delete("/users/:username/favorites/:movieTitle",((req,res)=>{
   res.status(201).send(`${req.params.movieTitle} has been removed from the favorites list!`);
   //more to come
}));

app.delete("/users/:username",((req,res)=>{
   let userToDelete = userList.find((user)=>{
      return user.userName === req.params.username
   })
   if(!userToDelete)
      res.status(400).send(`${req.params.username} was not found!`);
   else
      res.status(201).send(`User ${req.params.username} was deregistered!`);
   //more to come
}));

 app.get("/", (req, res) => {
   res.send("I will make him an offer he can`t refuse...");
 });

 app.listen(8080, () => {
   //console.log("Your app is listening on port 8080.");
 });