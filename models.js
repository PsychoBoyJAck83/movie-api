/**
 * Movie and User schemas for the MongoDB database.
 * @module Models
 */

const mongoose = require("mongoose"),
  bcrypt = require("bcrypt");

/**
 * Schema for Movie objects.
 * @typedef {Object} Movie
 * @property {string} title - The title of the movie.
 * @property {string} description - The description of the movie.
 * @property {Object} genre - The genre information of the movie.
 * @property {string} genre.name - The name of the genre.
 * @property {string} genre.description - The description of the genre.
 * @property {Object} director - The director information of the movie.
 * @property {string} director.name - The name of the director.
 * @property {string} director.bio - The biography of the director.
 * @property {number} director.birthYear - The birth year of the director.
 * @property {number} director.deathYear - The death year of the director.
 * @property {string} imageUrl - The URL of the movie's image.
 * @property {boolean} featured - Indicates if the movie is featured.
 */

let movieSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  genre: {
    name: String,
    description: String,
  },
  director: {
    name: String,
    bio: String,
    birthYear: Number,
    deathYear: Number,
  },
  imageUrl: String,
  featured: Boolean,
});

/**
 * Schema for User objects.
 * @typedef {Object} User
 * @property {string} Username - The username of the user.
 * @property {string} Password - The hashed password of the user.
 * @property {string} email - The email address of the user.
 * @property {Date} birthDate - The birthdate of the user.
 * @property {Array} favoriteMovies - An array of movie IDs that the user has added to favorites.
 */

let userSchema = mongoose.Schema({
  Username: { type: String, required: true },
  Password: { type: String, required: true },
  email: { type: String, required: true },
  birthDate: Date,
  favoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
});

/**
 * Hashes the given password using bcrypt.
 *
 * @function
 * @name hashPassword
 * @memberof module:Models~User
 * @param {string} password - The password to hash.
 * @returns {string} The hashed password.
 */
userSchema.statics.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

/**
 * Validates a password by comparing it with the stored hashed password.
 *
 * @function
 * @name validatePassword
 * @memberof module:Models~User
 * @param {string} password - The password to validate.
 * @returns {boolean} True if the password is valid, false otherwise.
 */
userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.Password);
};

let Movie = mongoose.model("Movie", movieSchema);
let User = mongoose.model("User", userSchema);

module.exports.Movie = Movie;
module.exports.User = User;
