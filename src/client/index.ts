import { OfflineClient, ConflictListener } from 'offix-client'
import { taskCacheUpdates } from './cache.updates'
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

/**
 * Class used to log data conflicts in server
 */
class ConflictLogger implements ConflictListener {
  constructor() { }
  async conflictOccurred(operationName: string, resolvedData: any, server: any, client: any) {
    // const dialog = await this.alertCtrl.create({
    //   message: `Conflict on ${operationName}.</br>
    //   Version from server: ${server.version}.</br>`,
    //   header: `🤷 Data conflict occurred`,
    //   buttons: ['OK']
    // });
    // dialog.present();
    console.log(`data: ${JSON.stringify(resolvedData)}, server: ${JSON.stringify(server)} client: ${JSON.stringify(client)} `);
  }
  async mergeOccurred(operationName: string, resolvedData: any, server: any, client: any) {
    // const dialog = await this.alertCtrl.create({
    //   message: `Merged data ${operationName}.</br>,
    //   Version from server: ${server.version}.</br>`,
    //   header: `🎉 Auto merge occurred`
    // });
    // dialog.present();
    // setTimeout(() => {
    //   dialog.dismiss();
    // }, 5000);
    console.log(`data: ${JSON.stringify(resolvedData)}, server: ${JSON.stringify(server)} client: ${JSON.stringify(client)} `);
  }
}

const apolloOptions = {
  httpUrl: 'http://localhost:4000/graphql',
  wsUrl: 'ws://localhost:4000/graphql',
  fileUpload: true
}

export function createOfflineClient() {
  const options = {
    ...apolloOptions,
    conflictListener: new ConflictLogger(),
    mutationCacheUpdates: taskCacheUpdates,
    authContextProvider: undefined
  }

  return new OfflineClient(options);
}

export function createApolloClient() {
  const cache = new InMemoryCache()
  const options = {
    cache,
    link: new HttpLink({ uri: apolloOptions.httpUrl }),
    ...apolloOptions
  }
  return new ApolloClient(options)
}