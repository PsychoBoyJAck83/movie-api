# Movie-API

This Node.js project serves as the backend for a web application, providing movie-related information through a set of endpoints.

## Table of Contents

- [Movie-API](#movie-api)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [Features](#features)
  - [Installation](#installation)
  - [Configuration](#configuration)

## Description

This project was realized with NodeJS v18.16.0. It retrieves information about movies and users via endpoints, which are stored in a mongoDB database.
For more information on the endpoints, please consult `public/documentation.html`.
For more information on the format of the users and movie documents please consult the models.js

## Features

List the key features and functionalities of your project.

- create, delete and edit a user account
- Add, remove favorite movies to/from user account
- Get info about the movies genre, its director and movie plot

## Installation

```bash
# Clone the repository
git clone https://github.com/PsychoBoyJAck83/movie-api.git

# Change into the project directory
cd your project name

# Install dependencies
npm install
```

## Configuration

When deploying the project set the environment variables CONNECTION_URI (MongoDB connection URI), JWT_ALGORITHM (cryptographic algorithm used to sign and verify) and JWT_SECRET (secret key)
