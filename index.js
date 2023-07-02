const    express = require("express"),
         morgan = require('morgan'),
         fs = require("fs"),
         path = require("path");
const app = express();

const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

const moviesList = [
   {
      title:      "The Godfather",
      year:       1972,
      genres:     ["Crime","Drama"],
      director:   ["Francis Ford Coppola"],
      writers:    ["Mario Puzzo","Francis Ford Coppola"],
      stars:      ["Marlon Brando","Al Pacino","James Caan"]
   },
   {
      title:      "Heat",
      year:       1995,
      genres:     ["Action","Crime","Drama"],
      director:   ["Michael Mann"],
      writers:    ["Michael Mann"],
      stars:      ["Al Pacino","Robert De Niro","Val Kilmer"]
   },
   {
      title:      "Oldboy",
      year:       2003,
      director:   ["Park Chan-wook"],
      genres:     ["Action","Drama","Mystery"],
      writers:    ["Garon Tsuchiya","Nobuaki Minegishi","Park Chan-wook"],
      stars:      ["Choi Min-sik","Yoo Ji-tae","Kang Hye-jeong"]
   },
   {
      title:      "The Royal Tenenbaums",
      year:       2001,
      genres:     ["Comedy","Drama"],
      director:   ["Wes Anderson"],
      writers:    ["Wes Anderson","Owen Wilson"],
      stars:      ["Gene Hackman","Gwyneth Paltrow","Anjelica Huston"]
   },
   {
      title:      "Fight Club",
      year:       1999,
      genres:     ["Drama"],
      director:   ["David Fincher"],
      writers:    ["Chuck Palahniuk","Jim Uhls"],
      stars:      ["Brad Pitt","Edward Norton","Meat Loaf"]
   },
   {
      title:      "American Beauty",
      year:       1999,
      genres:     ["Drama"],
      director:   ["Sam Mendes"],
      writers:    ["Alan Ball"],
      stars:      ["Kevin Spacey","Annette Bening","Thora Birch"]
   },
   {
      title:      "Lost in Translation",
      year:       2003,
      genres:     ["Drama"],
      director:   ["Sofia Coppola"],
      writers:    ["Sofia Coppola"],
      stars:      ["Bill Murray","Scarlett Johansson","Giovanni Ribisi"]
   },
   {
      title:      "Once Upon a Time... in Hollywood",
      year:       2019,
      genres:     ["Comedy","Drama"],
      director:   ["Quentin Tarantino"],
      writers:    ["Quentin Tarantino"],
      stars:      ["Leonardo DiCaprio","Brad Pitt","Margot Robbie"]
   },
   {
      title:      "Goodfellas",
      year:       1990,
      genres:     ["Biography","Crime","Drama"],
      director:   ["Martin Scorsese"],
      writers:    ["Nicholas Pileggi","Martin Scorsese"],
      stars:      ["Leonardo DiCaprio","Brad Pitt","Margot Robbie"]
   },
   {
      title:      "Star Wars: Episode V - The Empire Strikes Back",
      year:       1980,
      genres:     ["Action","Adventure","Fantasy"],
      director:   ["Irvin Kershner"],
      writers:    ["Leigh Brackett","Lawrence Kasdan","George Lucas"],
      stars:      ["Mark Hamill","Harrison Ford","Carrie Fisher"]
   }
];

const directorList = [
   {  
      name:       "Francis Ford Coppola",
      bio:        "Francis Ford Coppola is an American film director, producer, and screenwriter. He is considered one of the major figures of the New Hollywood filmmaking.",
      birthYear:  1939,
      deathYear:  null    
   },
   {  
      name:       "Quentin Tarantino",
      bio:        "Quentin Jerome Tarantino is an American film director, writer, producer, and actor. His films are characterized by stylized violence, extended dialogue including a pervasive use of profanity, and references to popular culture.",
      birthYear:  1963,
      deathYear:  null    
   }

];

let userList = [
   {
      userName: "Clubberboy69",
      email: "example@veryhotmail.com",
      password: "12345Spaceballs",
      birthyear: 1969
   }
];

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})

app.use(express.static("public"));

app.use(morgan('combined', {stream: accessLogStream}));

app.use((err, req, res, next) => {
   console.error(err.stack);
   res.status(500).send('Something broke!');
 });

app.get("/movies", (req, res) => {
   res.json(moviesList);
   res.send("Test");
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