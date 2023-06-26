const express = require("express");
const app = express();

let myTopTenMovies = [
   {
      title:      "The Godfather",
      year:       1972,
      director:   ["Francis Ford Coppola"],
      writers:    ["Mario Puzzo","Francis Ford Coppola"],
      stars:      ["Marlon Brando","Al Pacino","James Caan"]
   },
   {
      title:      "Heat",
      year:       1995,
      director:   ["Michael Mann"],
      writers:    ["Michael Mann"],
      stars:      ["Al Pacino","Robert De Niro","Val Kilmer"]
   },
   {
      title:      "Oldboy",
      year:       2003,
      director:   ["Park Chan-wook"],
      writers:    ["Garon Tsuchiya","Nobuaki Minegishi","Park Chan-wook"],
      stars:      ["Choi Min-sik","Yoo Ji-tae","Kang Hye-jeong"]
   },
   {
      title:      "The Royal Tenenbaums",
      year:       2001,
      director:   ["Wes Anderson"],
      writers:    ["Wes Anderson","Owen Wilson"],
      stars:      ["Gene Hackman","Gwyneth Paltrow","Anjelica Huston"]
   },
   {
      title:      "Fight Club",
      year:       1999,
      director:   ["David Fincher"],
      writers:    ["Chuck Palahniuk","Jim Uhls"],
      stars:      ["Brad Pitt","Edward NortonM","eat Loaf"]
   },
   {
      title:      "American Beauty",
      year:       1999,
      director:   ["Sam Mendes"],
      writers:    ["Alan Ball"],
      stars:      ["Kevin Spacey","Annette Bening","Thora Birch"]
   },
   {
      title:      "American Beauty",
      year:       1999,
      director:   ["Sam Mendes"],
      writers:    ["Alan Ball"],
      stars:      ["Kevin Spacey","Annette Bening","Thora Birch"]
   },
   {
      title:      "Once Upon a Time... in Hollywood",
      year:       2019,
      director:   ["Quentin Tarantino"],
      writers:    ["Quentin Tarantino"],
      stars:      ["Leonardo DiCaprio","Brad Pitt","Margot Robbie"]
   },
   {
      title:      "Goodfellas",
      year:       1990,
      director:   ["Martin Scorsese"],
      writers:    ["Nicholas Pileggi","Martin Scorsese"],
      stars:      ["Leonardo DiCaprio","Brad Pitt","Margot Robbie"]
   },
   {
      title:      "Star Wars: Episode V - The Empire Strikes Back",
      year:       1980,
      director:   ["Irvin Kershner"],
      writers:    ["Leigh Brackett","Lawrence Kasdan","George Lucas"],
      stars:      ["Mark Hamill","Harrison Ford","Carrie Fisher"]
   }
];

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})

app.use(express.static("public"));

app.use(morgan('combined', {stream: accessLogStream}));

app.get("/movies", (req, res) => {
   res.json(myTopTenMovies);
 });

 app.get("/", (req, res) => {
   res.send("I will make him an offer he can`t refuse...");
 });

 app.listen(8080, () => {
   //console.log("Your app is listening on port 8080.");
 });