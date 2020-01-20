import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { createOfflineClient } from './client'
import { OffixProvider } from 'react-offix-hooks'

import './globals.scss'

const client = createOfflineClient()

ReactDOM.render(
  <OffixProvider client={client as any}>
    <App/>
  </OffixProvider>,
  document.getElementById('root')
);
