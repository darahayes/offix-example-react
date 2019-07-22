import React from 'react'
import {
  IonList,
  IonItem,
  IonButton,
  IonLabel,
  IonNote,
  IonBadge,
  IonIcon
} from '@ionic/react'
import { TaskService } from '../../services/TaskService';

export interface Task {
  id: string;
  version: number;
  title: string;
  description: string;
  status: TaskStatus;
}

export enum TaskStatus {
  OPEN = 'OPEN',
  ASSIGNED = 'ASSIGNED',
  COMPLETE = 'COMPLETE'
}


export interface AllTasks {
  allTasks: Task[];
  task: Task;
  taskAdded: Task;
  taskDeleted: Task;
  taskUpdated: Task;
}

export enum MutationType {
  CREATED = 'CREATED',
  MUTATED = 'MUTATED',
  DELETED = 'DELETED'
}

export interface TaskListProps {
  tasks: [Task]
  taskService: TaskService
}

function isChecked(item: Task) {
  if (item.status === 'COMPLETE') {
    return true;
  }
  return false;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, taskService }) => {

  function onDeleteClick(task: Task) {
    return (e: MouseEvent) => {
      e.preventDefault()
      taskService.deleteItem(task)
    }
  }

  const items = tasks.map(task => {
    return (
      <IonItem key={task.id}>
        {/* <IonCheckbox checked={isChecked(task)} slot="start" className='ion-margin-end ion-align-items-start'></IonCheckbox> */}
        <IonLabel>
          <h2>{ task.title }</h2>
          <IonNote item-start>
            { task.description }
          </IonNote>
          <br />
          <IonNote>
            <IonBadge color='primary'>
              Server version: { task.version }
            </IonBadge>
          </IonNote>
        </IonLabel>
        <IonButton item-start  color='primary' fill="outline">
          <IonIcon name="create"/>
        </IonButton>
        <IonButton onClick={onDeleteClick(task)} item-start className='trash-button' color='primary' fill="outline">
          <IonIcon name="trash"/>
        </IonButton>
      </IonItem>
    )
  })

  return <IonList>{items}</IonList>;
};

export default TaskList