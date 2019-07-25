import React from 'react'
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

const NewItem: React.FunctionComponent = () => {
  return (
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
  )
}

export default NewItem