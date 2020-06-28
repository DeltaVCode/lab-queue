'use strict';

const superagent = require('superagent');
const users = require('../../models/users-model');
const Staff = require('../../../models/staff/staff-model');

/*
  Resources
  https://developer.github.com/apps/building-oauth-apps/
*/

const TOKEN_SERVER = process.env.TOKEN_SERVER;
const REMOTE_API = `${process.env.REMOTE_API_SERVER}/users.identity`;
const CLIENT_ID = process.env.REACT_APP_SLACK_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_SLACK_CLIENT_SECRET;
const API_SERVER = process.env.REACT_APP_API;

module.exports = async function authorize(req, res, next) {

  try {
    let code = req.query.code;
    console.log('(1) CODE:', code);

    let remoteToken = await exchangeCodeForToken(code);
    console.log('(2) ACCESS TOKEN:', remoteToken);

    let remoteUser = await getRemoteUserInfo(remoteToken);
    console.log('(3) SLACK USER', remoteUser);

    let [user, token] = await getUser(remoteUser);
    req.user = user;
    req.token = token;
    console.log('(4) LOCAL USER', user, token);

    next();
  } catch (e) { next(`ERROR: ${e.message}`); }

};

async function exchangeCodeForToken(code) {

  try {
    const queryObj = {
      code: code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET
    };

    let tokenResponse = await superagent.get(TOKEN_SERVER)
      .query(queryObj)

    let access_token = tokenResponse.body.authed_user.access_token;

    return access_token;
  } catch (e) {
    console.error('Token Get Error', e);
  }


}

async function getRemoteUserInfo(token) {

  console.log('here, with', token);
  console.log('go to', REMOTE_API);
  let userResponse =
    await superagent.get(REMOTE_API)
      .query({ token })

  let user = userResponse.body;

  return user;

}

async function getUser(remoteUser) {

  let staff = new Staff();
  let staffMember = await staff.get({ username: remoteUser.user.email });

  let userRecord = {
    username: remoteUser.user.id,
    email: remoteUser.user.email,
    fullname: remoteUser.user.name,
    password: 'oauthpassword',
  };

  if (staffMember.length) {
    userRecord.role = "admin";
  }

  let user = await users.createFromOauth(userRecord);
  let token = user.generateToken();

  return [user, token];

}
