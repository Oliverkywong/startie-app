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
  };

  const setCroppedImageFor = (croppedImageUrl: any) => {
    setState(croppedImageUrl);
    setCroppedImage(null);
  };

  // console.log(userdetails);

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
          onSubmit={handleSubmit(async (data) => {
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
            // console.log(data);
            router.push("/recommend");
          })}
        >
          <br />
          <IonImg src={state} />
          <IonLabel>Icon:</IonLabel>
          <input type="file" {...register("icon")} onChange={imghandle} />

          <IonLabel>Name</IonLabel>
          <IonInput
            {...register("name", { required: true })}
            type="text"
            placeholder="User Name"
          />

          <br />
          <IonLabel>Desicption:</IonLabel>
          <IonInput
            {...register("Description")}
            type="text"
            placeholder="Desicption"
          />

          <IonLabel className="formTitle">Team icon/image: </IonLabel>
          <input type="file" {...register("icon")} onChange={imghandle} />
          <input type="submit" />
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
