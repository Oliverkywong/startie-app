import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  useIonRouter,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Looking } from "../model";
import { loadUserInfo } from "../redux/userInfo/action";
import { RootState, useAppDispatch, useAppSelector } from "../store";
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
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async function () {
      const localtoken = localStorage.getItem("token");

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
            const result = await res.json()
            if (result.result) {
              console.log(result.userInfo)
              dispatch(loadUserInfo(result.userInfo));
              router.goBack();
            }
          })}
        >
          <img className="userEditIcon"
            src={
              image === null ?
                ((userdetails!.profilepic).slice(0, 4) === "data"
                  ? `${userdetails!.profilepic}`
                  : `${API_ORIGIN}/userUploadedFiles/${userdetails!.profilepic}`)
                : image
            }
          />
          <label className="formTitle">Icon:</label>
          <input type="file" {...register("icon")} onChange={imghandle} />

          <label className="formTitle">Name</label>
          <input
            {...register("name", { required: true })}
            type="text"
            placeholder="User Name"
          />
          <label className="formTitle">Phone Number:</label>
          <input
            {...register("phone", { required: true })}
            type="text"
            placeholder="Phone Number"
          />
          <label className="formTitle">Short Description:</label>
          <input
            {...register("shortDescription")}
            type="text"
            placeholder="One sentence to describe yourself"
          />
          <label className="formTitle">Description:</label>
          <input
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
