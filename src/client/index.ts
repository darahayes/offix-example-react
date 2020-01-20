import { OfflineClient, ConflictListener } from 'offix-client'
import { taskCacheUpdates } from './cache.updates'
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { split } from 'apollo-link';
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

export function createOfflineClient() {
  
  const httpLink = new HttpLink({
    uri: 'http://localhost:4000/graphql'
  });

  const wsLink = new WebSocketLink({
    uri: `ws://localhost:4000/graphql`,
    options: {
      reconnect: true
    }
  });

  // create the composite link
  const terminatingLink = split(
    // split based on operation type
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  );

  const options = {
    terminatingLink,
    conflictListener: new ConflictLogger(),
    mutationCacheUpdates: taskCacheUpdates,
    authContextProvider: undefined
  }

  return new OfflineClient(options);
}
