import {
  ADD_TASK,
  DELETE_TASK,
  GET_TASKS,
  UPDATE_TASK
} from '../client/graphql.queries';
import { AllTasks, Task } from '../declarations';
import {
  ApolloOfflineClient,
  OfflineStore,
  CacheOperation,
  createMutationOptions,
  subscribeToMoreHelper
} from 'offix-client';
import { subscriptionOptions } from '../client/cache.updates';
import { OfflineClient } from 'offix-client';
import ApolloClient from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';

export class TaskService {
  offlineStore: OfflineStore;
  apollo: ApolloOfflineClient;

  constructor(offixClient: OfflineClient, apolloClient: ApolloOfflineClient) {
    this.apollo = apolloClient;
    this.offlineStore = offixClient.offlineStore;
  }

  /**
   * Force cache refresh to get recent data
   */
  refreshItems() {
    // Force cache refresh by performing network
    return this.apollo.query({
      query: GET_TASKS,
      fetchPolicy: 'network-only',
      errorPolicy: 'none'
    });
  }

  // Watch local cache for updates
  getItems() {
    const getTasks = this.apollo.watchQuery({
      query: GET_TASKS,
      fetchPolicy: 'cache-first',
      errorPolicy: 'none'
    });
    subscribeToMoreHelper(getTasks, subscriptionOptions);
    return getTasks;
  }

  createItem(title:string, description:string) {
    return this.apollo.offlineMutation({
        mutation: ADD_TASK,
        variables: {
          'title': title,
          'description': description,
          'version': 1,
          'status': 'OPEN'
        },
        updateQuery: GET_TASKS,
        returnType: 'Task'
      });
  }

  updateItem(item: Task) {
    return this.apollo.offlineMutation({
        mutation: UPDATE_TASK,
        variables: item,
        updateQuery: GET_TASKS,
        returnType: 'Task',
        operationType: CacheOperation.REFRESH
      }
    );
  }

  deleteItem(item: Task) {
    return this.apollo.offlineMutation({
        mutation: DELETE_TASK,
        variables: item,
        updateQuery: GET_TASKS,
        returnType: 'Task',
        operationType: CacheOperation.DELETE
      }
    );
  }

  getOfflineItems() {
    return this.offlineStore.getOfflineData();
  }

  getClient() {
    return this.apollo;
  }
}
