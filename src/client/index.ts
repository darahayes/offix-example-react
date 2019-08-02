import { OfflineClient, ConflictListener } from 'offix-client'
import { taskCacheUpdates } from './cache.updates'
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

/**
 * Class used to log when conflict events occur
 */
class ConflictLogger implements ConflictListener {
  constructor() { }
  async conflictOccurred(operationName: string, resolvedData: any, server: any, client: any) {
    console.log(`data: ${JSON.stringify(resolvedData)}, server: ${JSON.stringify(server)} client: ${JSON.stringify(client)} `);
  }
  async mergeOccurred(operationName: string, resolvedData: any, server: any, client: any) {
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
