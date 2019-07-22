import { 
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonList,
  IonMenuButton,
  IonTitle,
  IonToolbar,
  IonCheckbox,
  IonLabel,
  IonNote,
  IonBadge,
  IonButton

} from '@ionic/react';
import React, { useState } from 'react';

import { useApolloClient, useQuery } from 'react-apollo-hooks';
import { GET_TASKS } from '../../client/graphql.queries'
import TaskList from './TaskList'
import { Task } from '../../declarations';
import { TaskService } from '../../services/TaskService';
import { useOffixClient } from '../../lib/OffixProvider';
import { ApolloOfflineClient } from 'offix-client';

const TaskListPage: React.FunctionComponent = () => {
  const client = useApolloClient()
  const offixClient = useOffixClient()

  // TODO - Probably shouldn't have to recreate this all the time
  const taskService = new TaskService(offixClient, client as ApolloOfflineClient)

  const { data, error } = useQuery<any>(GET_TASKS);

  const [allTasks, updateAllTasks] = useState([] as unknown as [Task])
  
  taskService.getItems().subscribe((result : any) => {
    if (result && !result.errors) {
      console.log('Result from query', result);
      // this.items = result.data && result.data.allTasks;
    } else {
      console.log('error from query', result);
    }
  }, (error: any) => {
    console.log('error from query', error);
  });

  console.log(data)

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Manage Tasks</IonTitle>
          <IonButtons slot="primary">
            <IonButton>
            <IonIcon slot="icon-only" name="add" />
          </IonButton>
      </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {data && data.allTasks? <TaskList tasks={data.allTasks} taskService={taskService}/> : null}
      </IonContent>
    </>
  );
}

export default TaskListPage;
