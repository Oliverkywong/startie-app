import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { useForm } from "react-hook-form";

import "./css/BuildTeam.css"

const BuildTeam: React.FC = () => {

  const { register, handleSubmit, watch } = useForm();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tab/home" />
          </IonButtons>
          <IonTitle>Build Your Team</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form onSubmit={handleSubmit(data => {
          const formData = new FormData();
          formData.append("teamName", data.teamName);
          formData.append("teamDescription", data.teamDescription);
          formData.append("teamImage", data.teamImage[0]);
          console.log(data);
        })}>
          <IonLabel>Team Picture:</IonLabel>
          <input type="file" {...register('teamImage')} /><br/>
          
          <IonLabel>Team Name</IonLabel>
          <IonInput
            {...register('teamName')}
            type="text"
            placeholder="Team Name" />
          <IonLabel>Team Descrption</IonLabel>
          <IonInput
            {...register('teamDescription')}
            type="text"
            placeholder="Descrption" />
          <input type="submit" />
        </form>
      </IonContent>

    </IonPage>
  );
}

export default BuildTeam;
