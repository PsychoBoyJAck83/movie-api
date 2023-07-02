const    express = require("express"),
         morgan = require('morgan'),
         fs = require("fs"),
         path = require("path");
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
   res.json(moviesList.find((movie) =>
   { return movie.title === req.params.title }));
});

app.get("/movies/:title/genre", (req, res) => {
   //res.send("I will make him an offer he can`t refuse...");
   let theMovie = moviesList.find((movie) =>
   { return movie.title === req.params.title });
   res.json(theMovie.genres);
 });

app.get("/directors/:name",(req,res)=>{
   res.json(directorList.find((director)=>{
      return director.name === req.params.name
   }))
});

app.post("/users",(req,res)=>{
   //let newUser = req.body;
   //   newUser.id = uuid.v4();
   //   userList.push(newUser);
      res.status(201).send("New user has been successfully created");
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