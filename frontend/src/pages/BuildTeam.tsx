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
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Cropper from 'react-easy-crop'

import "./css/Common.css";
import "./css/BuildTeam.css";
import team1 from "../img/team1.png";
import { Tag } from "../model";
import cropimg from "../img/team11.jpeg";

const BuildTeam: React.FC = () => {

  const router = useIonRouter();
  const [teamcategory, setTeamcategory] = useState<Tag[]>([]);

  useEffect(() => {
    (async function () {
      const localtoken = localStorage.getItem("token");
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/category`, {
        headers: {
          Authorization: `Bearer ${localtoken}`,
        },
      });
      const teamcategory = await res.json();
      setTeamcategory(teamcategory);
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


  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    console.log(croppedArea, croppedAreaPixels)
  }, [])

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
            formData.append("teamcategory", data.teamcategory);

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

          <IonLabel>Project Name :</IonLabel>
          <IonInput
            {...register("teamName", { required: true })}
            type="text"
            placeholder="Type here"
          />

          <IonLabel>Category :</IonLabel>
          <br />

          <IonItem>
            <IonSelect placeholder="Dropdown">
              {teamcategory.map((item) => (
                <IonSelectOption
                  key={item.id}
                  {...register("teamcategory", { required: true })}
                  value={`${item.name}`}
                >
                  {item.name}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>

          <br />
          <IonLabel>One sentence to describe your Team :</IonLabel>
          <IonInput
            {...register("teamDescription")}
            type="text"
            placeholder="Type here"
          />
          <IonImg src={state} />
          <IonLabel>Team Icon/Image :</IonLabel>
          <input type="file" {...register("teamImage")} onChange={imghandle} />
          <input type="submit" />
        </form>

        <Cropper
          image={state}
          crop={crop}
          zoom={zoom}
          aspect={16 / 9}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </IonContent>
    </IonPage>
  );
};

export default BuildTeam;
