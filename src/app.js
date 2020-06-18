import React from 'react';

import Iframe from 'react-iframe';

import SettingsContext from './context/settings.js';

import 'bootstrap/dist/css/bootstrap.min.css';

import Queue from './components/queue/queue.js';

import './app.scss';

export default class App extends React.Component {
  render() {
    return (
      <SettingsContext>
        <Iframe url="https://live.remo.co/e/code-fellows-labtime"
          width="100%"
          height="100%"
          id="remo"
          display="initial"
          allow="camera;microphone"
          position="relative" />
        <section id="queue">
          <Queue />
        </section>
      </SettingsContext>
    );
  }
}
