import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  useIonRouter,
} from "@ionic/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import icon from "../img/tonystarkicon.png";
import { RootState, useAppSelector } from "../store";
import "./css/Common.css";
import "./css/UserEdit.css";
import ImageCropDialogForUser from "./ImageCropDialogForUser";

export default function UserEdit() {
  const userdetails = useAppSelector((state: RootState) => state.auth.info);
  const router = useIonRouter();
  const { register, handleSubmit } = useForm();

  const [state, setState] = useState<any>(icon);

  const imghandle = (e: any) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setState(reader.result);
        setCroppedImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const [croppedImage, setCroppedImage] = useState<any>(null);

  const onCancel = () => {
    setState(null);
    setCroppedImage(null);
  };

  const setCroppedImageFor = (croppedImageUrl: any) => {
    setState(croppedImageUrl);
    setCroppedImage(null);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tab/profile" />
          </IonButtons>
          <IonTitle className="title">User Edit</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form
          className="buildTeamForm"
          onSubmit={handleSubmit(async (data) => {
            // console.log(data);
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("Description", data.Description);
            formData.append("icon", data.icon[0]);
            const localtoken = localStorage.getItem("token");

            await fetch(
              `${process.env.REACT_APP_BACKEND_URL}/user/${userdetails?.id}`,
              {
                method: "PUT",
                headers: {
                  Authorization: `Bearer ${localtoken}`,
                },
                body: formData,
              }
            );
            router.push("/recommend");
          })}
        >
          <br />
          <img className="userEditIcon" src={state} />
          <IonLabel className="formTitle">Icon:</IonLabel>
          <input type="file" {...register("icon")} onChange={imghandle} />

          <IonLabel className="formTitle">Name</IonLabel>
          <IonInput
            {...register("name", { required: true })}
            type="text"
            placeholder="User Name"
          />

          <br />
          <IonLabel className="formTitle">Description:</IonLabel>
          <IonInput
            {...register("Description")}
            type="text"
            placeholder="Description"
          />
          <input className="formSubmitButton" type="submit" value={"Done"} />
        </form>

        {croppedImage ? (
          <ImageCropDialogForUser
            imageUrl={state}
            onCancel={onCancel}
            setCroppedImageFor={setCroppedImageFor}
          />
        ) : null}
      </IonContent>
    </IonPage>
  );
}
