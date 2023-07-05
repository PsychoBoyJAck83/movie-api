const mongoose = require('mongoose'),
      bcrypt = require('bcrypt');

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

let userSchema = mongoose.Schema({
   Username : {type : String, required: true},
   Password : {type : String, required: true},
   email: {type : String, required: true},
   birthDate: Date,
   favoriteMovies: [{type: mongoose.Schema.Types.ObjectId, ref: "Movie"}]
});

userSchema.statics.hashPassword = (password) => {
   return bcrypt.hashSync(password, 10);
 };
 
 userSchema.methods.validatePassword = function(password) {
   return bcrypt.compareSync(password, this.Password);
 };

let Movie = mongoose.model("Movie",movieSchema);
let User = mongoose.model("User",userSchema);

module.exports.Movie = Movie;
module.exports.User = User;