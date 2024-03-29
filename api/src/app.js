'use strict';

/**
 * API Server Module
 * @module src/app
 */

const cwd = process.cwd();

// 3rd Party Resources

const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const server = require('http').Server(app);
global.io = require('socket.io')(server);

// Esoteric Resources
const errorHandler = require(`./middleware/500.js`);
const notFound = require(`./middleware/404.js`);
const authRouter = require(`./auth/router.js`);
const v1Router = require(`./api/v1.js`);

// App Level MW
app.use(morgan('dev'));
app.use(cors({ exposedHeaders: 'auth' }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(express.static(`${cwd}/build`));
app.use(authRouter);
app.use(v1Router);

app.get('/admin', (req, res) => {
  res.sendFile(`${cwd}/build/index.html`);
});

// Catchalls
app.use(notFound);
app.use(errorHandler);

/**
 * Start Server on specified port
 * @param port {integer} (defaults to process.env.PORT)
 */
let start = (port = process.env.PORT) => {
  server.listen(port, () => {
    console.log(`Server Up on ${port}`);
  });
};

module.exports = { app, start };
