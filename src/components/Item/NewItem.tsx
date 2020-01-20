import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonTitle,
  IonToolbar,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonCard

} from '@ionic/react';
import { useOfflineMutation } from 'react-offix-hooks';
import { ADD_TASK, GET_TASKS } from '../../client/graphql.queries'

const NewItem: React.FunctionComponent<RouteComponentProps> = ({ history }) => {

  const [ title, setTitle ] = useState('')
  const [ description, setDescription ] = useState('')

  const [ formErrors, setFormErrors ] = useState({})

  const [addTask, {
    called,
    data,
    error,
    hasError,
    loading,
    mutationVariables,
    calledWhileOffline,
    offlineChangeReplicated,
    offlineReplicationError
  }] = useOfflineMutation(ADD_TASK, {
    variables: {
      description,
      title,
      status: 'OPEN',
      version: 1
    },
    updateQuery: GET_TASKS,
    returnType: 'Task'
  })

  function submit(e: any) {
    e.preventDefault()
    addTask()
  }

  function renderMutationInfo() {
    return (
      <IonCard>
        <p>
          {JSON.stringify({
            called,
            data,
            error,
            hasError,
            loading,
            mutationVariables,
            calledWhileOffline,
            offlineChangeReplicated,
            offlineReplicationError
          }, null, 2)}
        </p>
      </IonCard>
    )
  }

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>New Item</IonTitle>
          <IonButtons slot="primary">
            <IonButton>
              <IonIcon slot="icon-only" name="add" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      {renderMutationInfo()}
        <form onSubmit={submit}>
          <IonItem>
            <IonLabel color="primary" position="floating">Title</IonLabel>
            <IonInput type="text" required name="title" value={title} onInput={(e: any) => setTitle(e.target.value)}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel color="primary" position="floating">Description</IonLabel>
            <IonInput type="text" required name="description" value={description} onInput={(e: any) => setDescription(e.target.value)}></IonInput>
          </IonItem>
          <IonButton className="submit-btn" expand="block" type="submit">Create</IonButton>
        </form>
      </IonContent>
    </>
  )
}

export default NewItem