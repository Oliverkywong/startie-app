import { IonBackButton, IonButtons, IonContent, IonHeader, IonImg, IonInput, IonLabel, IonPage, IonTitle, IonToolbar, useIonRouter } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { PhotoViewer } from '@awesome-cordova-plugins/photo-viewer';

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

  const [state, setState]=useState<any>(team1)

  const imghandle = (e:any) => {
    const reader = new FileReader()
    // console.log(reader)
    reader.onload = () => {
      if (reader.readyState === 2) {
        setState(reader.result)
      }
    }
    reader.readAsDataURL(e.target.files[0])
  }

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
        <IonImg src={state} />

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
          {/* <>{PhotoViewer.show('teamImage')}</> */}
          <IonLabel>Team Picture:</IonLabel>
          <input type="file" {...register('teamImage')} onChange={imghandle} /><br />

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
