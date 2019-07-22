import React, { useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonPage, IonReactRouter, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { AppPage } from '../declarations';

import { ApolloOfflineClient, OfflineClient } from 'offix-client'
import { createApolloClient } from '../client'
import { ApolloProvider } from 'react-apollo-hooks'

import Menu from './Menu';
import Home from './Home';
import List from './TaskList';
import { home, list } from 'ionicons/icons';
import { useOffixClient } from '../lib/OffixProvider';

const appPages: AppPage[] = [
  {
    title: 'Home',
    url: '/home',
    icon: home
  },
  {
    title: 'Manage Tasks',
    url: '/home/list',
    icon: list
  }
];

const App: React.FunctionComponent = () => {
  const offixClient = useOffixClient()

  // mega hack where we first create a regular apollo client
  // So that other hooks and the ApolloProvider component 
  // do not crash the app when there is no client
  const [apolloClient, setApolloClient ] = useState(() => {
    return createApolloClient() as unknown as ApolloOfflineClient
  })

  console.log('app render')

  // Hack to check if the apollo client is a regular one
  // if it is then call offixClient.init() and then
  // update the client we use with the one from init
  // this hack ensures we only call init once even though
  // this component is potentially rendered twice.
  // Once at startup and again after offixClient.init is finished
  if (!apolloClient.offlineMutation) {
    offixClient.init().then((client) => {
      // @ts-ignore
      console.log('offline client initialized')
      setApolloClient(client)
    })
  }

  if (apolloClient) {
    return (
      <ApolloProvider client={apolloClient}>
        {renderApp()}
      </ApolloProvider>
    )
  }
  return renderApp()
}

const renderApp = () => {
  return (
    <IonApp>
    <IonReactRouter>
      <IonSplitPane contentId="main">
        <Menu appPages={appPages} />
        <IonPage id="main">
          <IonRouterOutlet>
            <Route path="/:tab(home)" component={Home} exact={true} />
            <Route path="/:tab(home)/list" component={List} exact={true} />
            <Route exact path="/" render={() => <Redirect to="/home" />} />
          </IonRouterOutlet>
        </IonPage>
      </IonSplitPane>
    </IonReactRouter>
  </IonApp>
  )
}

export default App;
