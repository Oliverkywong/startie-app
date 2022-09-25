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
import React, { useLayoutEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Looking } from "../model";
import { RootState, useAppSelector } from "../store";
import { API_ORIGIN } from "../utils/api";
import "./css/Common.css";
import "./css/UserEdit.css";
import ImageCropDialogForUser from "./ImageCropDialogForUser";

export default function UserEdit() {
  const userdetails = useAppSelector((state: RootState) => state.auth.info);
  const router = useIonRouter();
  const [look, setLook] = useState<Looking[]>([]);
  const [image, setImage] = useState<any>(null);
  const { register, handleSubmit } = useForm();
 
  useLayoutEffect(() => {
    (async function () {
      const localtoken = localStorage.getItem("token");
      if (localtoken === null) {
        router.push("/tab/login");
      }

      const lookres = await fetch(`${API_ORIGIN}/tag`, {
        headers: {
          Authorization: `Bearer ${localtoken}`,
        }
      });
      const lookresult = await lookres.json();
      setLook(lookresult);

    })();
  }, []);

  const imghandle = (e: any) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
        setCroppedImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const [croppedImage, setCroppedImage] = useState<any>(null);

  const onCancel = () => {
    setImage(null);
    setCroppedImage(null);
  };

  const setCroppedImageFor = (croppedImageUrl: any) => {
    setImage(croppedImageUrl);
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
            const localtoken = localStorage.getItem("token");

            const res = await fetch(
              `${API_ORIGIN}/app/user/${userdetails?.id}`,
              {
                method: "PUT",
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${localtoken}`,
                },
                body: JSON.stringify({ data: data, img: image })
              }
            );
            const result = res.json()
            console.log(result)
            // dispatch(loadUserInfo(userRecord["user"].user[0]));
            router.push("/tab/profile");
          })}
        >
          <img className="userEditIcon" src={image === null ?
            ((userdetails!.profilepic).slice(0, 4) === "data"
              ? `${userdetails!.profilepic}`
              : `${API_ORIGIN}/userUploadedFiles/${userdetails!.profilepic}`)
            : image
          } />
          <IonLabel className="formTitle">Icon:</IonLabel>
          <input type="file" {...register("icon")} onChange={imghandle} />

          <IonLabel className="formTitle">Name</IonLabel>
          <IonInput
            {...register("name", { required: true })}
            type="text"
            placeholder="User Name"
          />
          <IonLabel className="formTitle">Phone Number:</IonLabel>
          <IonInput
            {...register("phone", { required: true })}
            type="text"
            placeholder="Phone Number"
          />
          <IonLabel className="formTitle">Short Description:</IonLabel>
          <IonInput
            {...register("shortDescription")}
            type="text"
            placeholder="One sentence to describe yourself"
          />
          <IonLabel className="formTitle">Description:</IonLabel>
          <IonInput
            {...register("Description")}
            type="text"
            placeholder="Description"
          />
          <label htmlFor="dropdownList" className="formTitle">
            Good at:
          </label>
          <select id="dropdownList" className="formDropdownSelect" required>
            <option value="" >
              Select one
            </option>
            {look.map((item) => (
              <option
                className="formDropdownList"
                key={item.id}
                {...register("goodat", { required: true })}
                value={`${item.id}`}
              >
                {item.name}
              </option>
            ))}
          </select>
          <input className="formSubmitButton" type="submit" value={"Done"} />
        </form>

        {croppedImage ? (
          <ImageCropDialogForUser
            imageUrl={image}
            onCancel={onCancel}
            setCroppedImageFor={setCroppedImageFor}
          />
        ) : null}
      </IonContent>
    </IonPage>
  );
}
