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
import { useOffixClient } from 'react-offix-hooks';
import { ApolloOfflineClient, subscribeToMoreHelper } from 'offix-client';
import { Link } from 'react-router-dom';
import { add } from 'ionicons/icons'

const TaskListPage: React.FunctionComponent = () => {
  const client = useApolloClient()
  const offixClient = useOffixClient()

  const [allTasks, updateAllTasks] = useState([] as unknown as [Task])

  // TODO - Probably shouldn't have to recreate this all the time
  const taskService = new TaskService(offixClient as any, client as any)

  // really hacky way to do things coming from the showcase
  // There's gotta be a cleaner way to do things
  useEffect(() => {
    taskService.refreshItems()
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
                <IonIcon slot="icon-only" icon={add} />
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
