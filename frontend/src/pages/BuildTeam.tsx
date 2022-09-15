import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import "./css/Common.css";
import "./css/BuildTeam.css";
import team1 from "../img/team1.png";

const BuildTeam: React.FC = () => {
  interface tag {
    id: number;
    name: string;
  }

  const router = useIonRouter();
  const [teamTag, setTeamTag] = useState<tag[]>([]);

  useEffect(() => {
    (async function () {
      const localtoken = localStorage.getItem("token");
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/teamtag`, {
        headers: {
          Authorization: `Bearer ${localtoken}`,
        },
      });
      const teamtag = await res.json();
      setTeamTag(teamtag);
    })();
  }, []);

  const { register, handleSubmit } = useForm();

  const [state, setState] = useState<any>(team1);

  const imghandle = (e: any) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setState(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tab/home" />
          </IonButtons>
          <IonTitle className="title">Build Your Team</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form
          action="/team"
          method="post"
          onSubmit={handleSubmit(async (data) => {
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
            // console.log(data);
            router.push("/recommend");
          })}
        >
          <br />

          <IonLabel>Project Name</IonLabel>
          <IonInput
            {...register("teamName", { required: true })}
            type="text"
            placeholder="Type here"
          />

          <IonLabel>Category</IonLabel>
          <br />

          <IonItem>
            <IonSelect placeholder="Dropdown">
              {teamTag.map((tag) => (
                <IonSelectOption
                  {...register("teamTag", { required: true })}
                  value={`${tag.name}`}
                >
                  {tag.name}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>

          <br />
          <IonLabel>One sentence to describe your project:</IonLabel>
          <IonInput
            {...register("teamDescription")}
            type="text"
            placeholder="Type here"
          />
          <IonImg src={state} />
          <IonLabel>Team icon/image:</IonLabel>
          <input type="file" {...register("teamImage")} onChange={imghandle} />
          <input type="submit" />
        </form>
      </IonContent>
    </IonPage>
  );
};

export default BuildTeam;
