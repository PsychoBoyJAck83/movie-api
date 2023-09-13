/**
 * Authentication and token generation route.
 * @module Authentication
 */

/**
 * Secret key used for JWT token generation.
 * @constant {string}
 * @default
 */
const jwtSecret = process.env.JWT_SECRET;

const jwt = require("jsonwebtoken"),
  passport = require("passport");

// Local passport file for authentication
require("./passport");

/**
 * Generates a JWT token for the user.
 *
 * @function
 * @name generateJWTToken
 * @param {Object} user - The user object to encode in the token.
 * @returns {string} The JWT token.
 */
let generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username,
    expiresIn: "7d",
    algorithm: "HS256",
  });
};

/**
 * Handles user login and generates a JWT token upon successful login.
 *
 * @function
 * @name POST /login
 * @memberof module:Authentication
 * @inner
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 */
module.exports = (router) => {
  router.post("/login", (req, res) => {
    passport.authenticate("local", { session: false }, (error, user, info) => {
      if (error || !user) {
        return res.status(400).json({
          message: "Incorrect username or password!",
        });
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          res.send(error);
        }
        let token = generateJWTToken(user.toJSON());
        return res.status(200).json({ user, token });
      });
    })(req, res);
  });
};
