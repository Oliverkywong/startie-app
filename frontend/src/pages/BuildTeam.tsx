import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonImg,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { useForm } from "react-hook-form";
import "./css/Common.css";
import "./css/BuildTeam.css";
import { Looking, Tag } from "../model";
import ImageCropDialogForTeam from "./ImageCropDialogForTeam";
import { API_ORIGIN } from "../utils/api";
import React, { useLayoutEffect, useState } from "react";

const BuildTeam: React.FC = () => {
  const router = useIonRouter();
  const [teamcategory, setTeamcategory] = useState<Tag[]>([]);
  const [look, setLook] = useState<Looking[]>([]);

  useLayoutEffect(() => {
    (async function () {
      const localtoken = localStorage.getItem("token");
      if (localtoken === null) {
        router.push("/tab/login");
      }

      const res = await fetch(`${API_ORIGIN}/category`, {
        headers: {
          Authorization: `Bearer ${localtoken}`,
        }
      });
      const teamcategory = await res.json();
      setTeamcategory(teamcategory);

      const lookres = await fetch(`${API_ORIGIN}/tag`, {
        headers: {
          Authorization: `Bearer ${localtoken}`,
        }
      });
      const lookresult = await lookres.json();
      setLook(lookresult);

    })();
  }, []);

  const { register, handleSubmit, reset } = useForm();

  const [image, setImage] = useState<any>(null);

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
            <IonBackButton defaultHref="/tab/home" />
          </IonButtons>
          <IonTitle className="title">New Team</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form
          className="buildTeamForm"
          action="/team"
          method="post"
          onSubmit={handleSubmit(async (data) => {
            const localtoken = localStorage.getItem("token");

            const res = await fetch(`${API_ORIGIN}/app/team`, {
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localtoken}`
              },
              body: JSON.stringify({ data: data, img: image })
            })

            router.push("/recommend");
          })}
        >
          <label htmlFor="nameInput" className="formTitle">
            Team Name:
          </label>
          <input
            id="nameInput"
            className="formName"
            {...register("teamName", { required: true })}
            type="text"
            placeholder="Type here..."
          />

          <label htmlFor="dropdownList" className="formTitle">
            Category:
          </label>
          <select id="dropdownList" className="formDropdownSelect" required>
            <option value="" >
              Select Category
            </option>
            {teamcategory.map((item) => (
              <option
                className="formDropdownList"
                key={item.id}
                {...register("teamcategory", { required: true })}
                value={`${item.id}`}
              >
                {item.name}
              </option>
            ))}
          </select>
          <label htmlFor="descriptionInput" className="formTitle">
            One sentence to describe your Team:
          </label>
          <input
            id="descriptionInput"
            className="formDescribion"
            {...register("teamshortDescription")}
            type="text"
            placeholder="Type here..."
          />
          <label htmlFor="descriptionInput" className="formTitle">
            Describe your Team:
          </label>
          <input
            id="descriptionInput"
            className="formDescribion"
            {...register("teamDescription")}
            type="text"
            placeholder="Type here..."
          />
          {image && <IonImg src={image} />}
          <label htmlFor="formImage" className="formTitle">
            Team icon / image:
          </label>
          <input
            id="formImage"
            type="file"
            {...register("teamImage")}
            onChange={imghandle}
          />
          <label htmlFor="dropdownList" className="formTitle">
            Looking for:
          </label>
          <select id="dropdownList" className="formDropdownSelect" required>
            <option value="" >
              Select one
            </option>
            {look.map((item) => (
              <option
                className="formDropdownList"
                key={item.id}
                {...register("teamlooking", { required: true })}
                value={`${item.id}`}
              >
                {item.name}
              </option>
            ))}
          </select>
          <input className="formSubmitButton" type="submit" value={"Next"} />
        </form>

        {croppedImage ? (
          <ImageCropDialogForTeam
            imageUrl={image}
            onCancel={onCancel}
            setCroppedImageFor={setCroppedImageFor}
          />
        ) : null}
      </IonContent>
    </IonPage>
  );
};

export default BuildTeam;
