import { 
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonTitle,
  IonToolbar,
  IonButton

} from '@ionic/react';
import React, { useState, useEffect } from 'react';

import { useApolloClient, useQuery } from 'react-apollo-hooks';
import { GET_TASKS } from '../../client/graphql.queries'
import TaskList from './TaskList'
import { Task } from '../../declarations';
import { TaskService } from '../../services/TaskService';
import { useOffixClient } from '../../lib/OffixProvider';
import { ApolloOfflineClient, subscribeToMoreHelper } from 'offix-client';
import { Link } from 'react-router-dom';

const TaskListPage: React.FunctionComponent = () => {
  const client = useApolloClient()
  const offixClient = useOffixClient()

  const [allTasks, updateAllTasks] = useState([] as unknown as [Task])

  // TODO - Probably shouldn't have to recreate this all the time
  const taskService = new TaskService(offixClient, client as ApolloOfflineClient)

  useEffect(() => {
    taskService.getItems().subscribe((result : any) => {
      if (result && !result.errors) {
        console.log('Result from query', result);
        updateAllTasks(result.data.allTasks)
      } else {
        console.log('error from query', result);
      }
    }, (error: any) => {
      console.log('error from query', error);
    });
  }, [])

  // console.log(data)

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Manage Tasks</IonTitle>
          <IonButtons slot="primary">
            <Link to="/newItem">
              <IonButton href="/newItem">
                <IonIcon slot="icon-only" name="add" />
              </IonButton>
            </Link>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <TaskList tasks={allTasks} taskService={taskService}/>
      </IonContent>
    </>
  );
}

export default TaskListPage;
