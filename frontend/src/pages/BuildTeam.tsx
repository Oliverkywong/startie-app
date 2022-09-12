import { IonBackButton, IonButtons, IonContent, IonHeader, IonImg, IonInput, IonLabel, IonPage, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";

import "./css/BuildTeam.css"
import team1 from '../img/team1.png'

const BuildTeam: React.FC = () => {

  interface tag {
    id: number;
    name: string;
  }

  const router = useIonRouter();
  const [teamTag, setTeamTag] = useState<tag[]>([]);
  useEffect(() => {
    (async function () {
      const localtoken = localStorage.getItem('token')
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/teamtag`, {
        headers: {
          'Authorization': `Bearer ${localtoken}`
        }
      })
      const teamtag = await res.json()
      setTeamTag(teamtag)
    })()
  }, [])

  const { register, handleSubmit } = useForm();

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

        <IonImg src={team1} />
        <form onSubmit={handleSubmit((data) => {
          const formData = new FormData();
          formData.append("teamImage", data.teamImage[0])
          console.log(data)
        }
        )}>

          <IonLabel>Team Pure:</IonLabel>
          <input type="file" {...register('teamImage')} />
          <input type="submit" />
        </form>


        <form onSubmit={handleSubmit(async (data) => {
          const formData = new FormData();
          formData.append("teamName", data.teamName);
          formData.append("teamDescription", data.teamDescription);
          formData.append("teamImage", data.teamImage[0]);
          formData.append("teamTag", data.teamTag);

          // await fetch(`${process.env.REACT_APP_BACKEND_URL}/team`, {
          //   method: "POST",
          //   headers: {
          //     'Authorization': `Bearer ${localtoken}`
          //   },
          //   body: formData,
          // })
          console.log(data);
          router.push("/recommend");

        })}>
          <IonLabel>Team Picture:</IonLabel>
          <input type="file" {...register('teamImage')} /><br />

          <IonLabel>Team Name:</IonLabel>
          <IonInput
            {...register('teamName')}
            type="text"
            placeholder="Team Name" />

          <IonLabel>Team Category:</IonLabel><br />

          {
            teamTag.map(tag => (
              <IonLabel><input type="checkbox" value={tag.id} {...register('teamTag')} />{tag.name} </IonLabel>
            ))
          }
          <br />
          <IonLabel>Team Descrption:</IonLabel>
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
