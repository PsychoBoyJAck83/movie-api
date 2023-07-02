const mongoose = require('mongoose');

let movieSchema = mongoose.Schema({
   title: {type: String, required: true},
   description: {type: String, required: true},
   genre: {
      name: String,
      description: String
   },
   director: {
      name: String,
      bio: String,
      birthYear: Number,
      deathYear: Number 
   },
   imageUrl: String,
   featured: Boolean
});