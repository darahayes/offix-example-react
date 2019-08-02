import React, { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonPage, IonReactRouter, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { AppPage } from '../declarations';

import { ApolloOfflineClient, OfflineClient } from 'offix-client'
import { ApolloProvider } from 'react-apollo-hooks'

import Menu from './Menu';
import Home from './Home';
import List from './TaskList';
import { home, list } from 'ionicons/icons';
import { useOffixClient } from '../lib/offix-react-hooks/OffixProvider';
import NewItem from './Item/NewItem';

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

  // First we initialize a piece of state called apolloClient
  // It's null at the start
  const [apolloClient, setApolloClient] = useState(null as unknown as ApolloOfflineClient)

  console.log('app render')

  // Inside useEffect, initialize the offix client and set the apollo client
  // This only happens once.
  useEffect(() => {
    offixClient.init().then((client) => {
      console.log('offline client initialized')
      setApolloClient(client)
    })
  }, [])

  // load the app if the apolloClient is there, otherwise load a loading screen
  if (apolloClient) {
    return (
      <ApolloProvider client={apolloClient}>
        {renderApp()}
      </ApolloProvider>
    )
  }
  return <div>Loading...</div>
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
            <Route path="/newItem" component={NewItem} exact={true}/>
            <Route exact path="/" render={() => <Redirect to="/home" />} />
          </IonRouterOutlet>
        </IonPage>
      </IonSplitPane>
    </IonReactRouter>
  </IonApp>
  )
}

export default App;
