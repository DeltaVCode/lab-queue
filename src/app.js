import React from 'react';

import SettingsContext from './context/settings.js';
import LoginContext from './components/auth/context.js';

import 'bootstrap/dist/css/bootstrap.min.css';

import Queue from './components/queue/queue.js';

import './app.scss';

export default class App extends React.Component {
  render() {
    return (
      <LoginContext>
        <SettingsContext>
          <section id="queue">
            <Queue />
          </section>
        </SettingsContext>
      </LoginContext>
    );
  }
}
