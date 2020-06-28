import React from 'react';

import Iframe from 'react-iframe';

import { BrowserRouter, Route } from 'react-router-dom';
import SettingsContext from './context/settings.js';
import LoginContext from './components/auth/context.js';

import 'bootstrap/dist/css/bootstrap.min.css';

import Queue from './components/queue/queue.js';
import Admin from './components/admin/admin.js';

import './app.scss';

const url = process.env.REACT_APP_LAB_URL;

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <LoginContext>
          <SettingsContext>
            <Route exact path="/admin"><Admin /></Route>
            <Route exact path="/">
              <Iframe url={url}
                height="100%"
                id="remo"
                display="initial"
                allow="fullscreen;camera;microphone"
                position="relative" />
              <Queue />
            </Route>
          </SettingsContext>
        </LoginContext>
      </BrowserRouter>
    );
  }
}
