const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

const app = express();

const mongoose = require("mongoose");
const Models = require("./models.js");

const Movies = Models.Movie;
const Users = Models.User;

mongoose
  .connect("mongodb://localhost:27017/movie_api", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
    app.listen(8080, () => {
      console.log("Your app is listening on port 8080.");
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database:", err);
  });

const accessLogStream = fs.createWriteStream(path.join(__dirname, "log.txt"), {
  flags: "a",
});

app.use(express.static("public"));
app.use(express.json());

app.use(morgan("combined", { stream: accessLogStream }));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.get("/movies", (req, res) => {
  Movies.find({ "Genre.Name": "Crime" })
    .then((movies) => {
      res.json(movies);
    })
    .catch((error) => {
      console.error("Failed to fetch movies:", error);
      res.status(500).send("Failed to fetch movies");
    });
});

app.get("/movies/:title", (req, res) => {
  Movies.findOne({ Title: req.params.title })
    .then((movie) => {
      if (movie) {
        res.json(movie);
      } else {
        res.status(404).send("Movie not found");
      }
    })
    .catch((error) => {
      console.error("Failed to fetch movie:", error);
      res.status(500).send("Failed to fetch movie");
    });
});

app.get("/movies/:title/genre", (req, res) => {
  Movies.findOne({ Title: req.params.title })
    .then((movie) => {
      if (movie) {
        res.json(movie.Genre);
      } else {
        res.status(404).send("Movie not found");
      }
    })
    .catch((error) => {
      console.error("Failed to fetch movie genre:", error);
      res.status(500).send("Failed to fetch movie genre");
    });
});

app.get("/directors/:name", (req, res) => {
  // Implement the logic to fetch director by name from the database
});

app.post("/users", (req, res) => {
  // Implement the logic to create a new user
});

app.put("/users/update/:username/:userData/:newUserDataValue", (req, res) => {
  // Implement the logic to update user data
});

app.post("/users/:username/favorites/:movieTitle", (req, res) => {
  // Implement the logic to add a movie to user favorites
});

app.delete("/users/:username/favorites/:movieTitle", (req, res) => {
  // Implement the logic to remove a movie from user favorites
});

app.delete("/users/:username", (req, res) => {
  // Implement the logic to delete a user
});

app.get("/", (req, res) => {
  res.send("I will make him an offer he can't refuse...");
});
