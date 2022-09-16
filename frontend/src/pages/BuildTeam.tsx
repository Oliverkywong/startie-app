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
import { Tag } from "../model";

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
          className="buildTeamForm"
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
          <IonLabel className="formTitle">Project Name</IonLabel>
          <IonInput
            className="formInput"
            {...register("teamName", { required: true })}
            type="text"
            placeholder="Type here..."
          />

          <IonLabel className="formTitle">Category</IonLabel>

          <IonItem className="formDropdownSelect">
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

          <IonLabel className="formTitle">
            One sentence to describe your project:
          </IonLabel>
          <IonInput
            className="DescribionFormInput"
            {...register("teamDescription")}
            type="text"
            placeholder="Type here..."
          />
          <IonImg src={state} />
          <IonLabel className="formTitle">Team icon/image: </IonLabel>
          <input type="file" {...register("teamImage")} onChange={imghandle} />
          <input className="formSubmitButton" type="submit" />
        </form>
      </IonContent>
    </IonPage>
  );
};

export default BuildTeam;
