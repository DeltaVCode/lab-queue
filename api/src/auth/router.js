'use strict';

const express = require('express');
const authRouter = express.Router();

const User = require('./models/users-model.js');
const Role = require('./models/roles-model.js');
const auth = require('./middleware/basic.js');
const token = require('./middleware/bearer.js');
const acl = require('./middleware/acl.js');
const oauth = require('./middleware/oauth/slack.js');

authRouter.post('/signup', (req, res, next) => {
  let user = new User(req.body);
  user.save()
    .then((user) => {
      req.token = user.generateToken();
      req.user = {
        username: user.username,
        fullname: user.fullname,
        email: user.email,
        acl: user.acl,
      };
      res.send({ user: req.user, token: req.token });
    }).catch(next);
});

authRouter.post('/signin', auth, (req, res, next) => {
  res.status(200).send({ user: req.user, token: req.token });
});

authRouter.get('/oauth', oauth, (req, res, next) => {
  res.status(200).redirect(`${process.env.REACT_APP_WEBSITE}?token=${req.token}`);
});

authRouter.post('/role', (req, res, next) => {
  let role = new Role(req.body);
  role.save()
    .then((newRole) => {
      res.status(200).send(newRole);
    }).catch(next);
});

authRouter.get('/user', token, acl('read'), (req, res, next) => {
  res.status(200).send({ user: req.user, token: req.token });
});

module.exports = authRouter;
