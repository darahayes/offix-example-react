import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { createOfflineClient } from './client'
import { OffixProvider } from './lib/offix-react-hooks/OffixProvider'

import './globals.scss'

const client = createOfflineClient()

ReactDOM.render(
  <OffixProvider client={client}>
    <App/>
  </OffixProvider>,
  document.getElementById('root')
);
