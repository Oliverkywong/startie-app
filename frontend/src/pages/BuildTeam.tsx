import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonImg,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import React, { useLayoutEffect, useState } from "react";
import { useForm } from "react-hook-form";
// import { useIonFormState } from 'react-use-ionic-form'

import "./css/Common.css";
import "./css/BuildTeam.css";
import { Tag } from "../model";
import ImageCropDialogForTeam from "./ImageCropDialogForTeam";
import { register } from "../serviceWorkerRegistration";


// export declare function useIonFormState<T extends object>(initialValue?: T): {
//   state: T;
//   setState: React.Dispatch<React.SetStateAction<T>>;
//   reset: () => void;
//   item<K extends keyof T, E extends CustomEvent<any>>(props: UseIonFormItemOptions<T, K, E>): JSX.Element;
// }

// export declare type UseIonFormItemOptions<T extends object, K extends keyof T, E extends CustomEvent> = {
//   name: K;
//   label?: string;
//   renderContent: (props: {
//       onIonChange: (e: any) => void;
//       value?: T[K];
//       checked?: boolean;
//   }) => JSX.Element;
//   mapValue?: (event: E, currentValue: T[K]) => T[K];
//   renderLabel?: typeof IonFormItemOptions.Label;
// }




const BuildTeam: React.FC = () => {
  const router = useIonRouter();
  const [teamcategory, setTeamcategory] = useState<Tag[]>([]);

  useLayoutEffect(() => {
    (async function () {
      const localtoken = localStorage.getItem("token");
      if (localtoken === null) {
        router.push("/tab/login");
      }

      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/category`, {
        headers: {
          Authorization: `Bearer ${localtoken}`,
        }
      });
      const teamcategory = await res.json();
      setTeamcategory(teamcategory);
    })();
  }, []);

  const { register, handleSubmit, reset } = useForm();

  // const { setState, state, reset, item } = useIonFormState();
  const [fetchdata, setFetchdata] = useState<any>(null);
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
          <IonTitle className="title">NEW Project</IonTitle>
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
            const localtoken = localStorage.getItem("token");
            // console.log(data);
            // console.log(formData);

            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/team`, {
              method: "POST",
              headers: {
                'Authorization': `Bearer ${localtoken}`
              },
              body: formData,
            })
            reset(res)
            
            router.push("/recommend");
          })}
        >
          <label htmlFor="nameInput" className="formTitle">
            Project Name
          </label>
          <input
            id="nameInput"
            className="formName"
            {...register("teamName", { required: true })}
            type="text"
            placeholder="Type here..."
          />

          <label htmlFor="dropdownList" className="formTitle">
            Category
          </label>
          <select id="dropdownList" className="formDropdownSelect" required>
            <option value="" >
              Dropdown
            </option>
            {teamcategory.map((item) => (
              <option
                className="formDropdownList"
                key={item.id}
                {...register("teamcategory", { required: true })}
                value={`${item.name}`}
              >
                {item.name}
              </option>
            ))}
          </select>

          <label htmlFor="descriptionInput" className="formTitle">
            One sentence to describe your project:
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
          <input className="formSubmitButton" type="submit" value={"Next"} />
        </form>



        {/* <form
          className="buildTeamForm"
          // action="/team"
          // method="post"
          onSubmit={handleSubmit(async (data) => {
            const formData = new FormData();
            formData.append("teamName", data.teamName);
            formData.append("teamDescription", data.teamDescription);
            formData.append("teamImage", data.teamImage[0]);
            formData.append("teamcategory", data.teamcategory);
            const localtoken = localStorage.getItem("token");

            console.log(data);
            setFetchdata(formData)
            console.log(formData);

            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/team`, {
              method: "POST",
              headers: {
                'Authorization': `Bearer ${localtoken}`
              },
              body: fetchdata,
            })
            reset(res)

            router.push("/recommend");
          })}
        >
          <label htmlFor="nameInput" className="formTitle">
            Project Name
          </label>
          <input
            id="nameInput"
            className="formName"
            {...register("teamName", { required: true })}
            type="text"
            placeholder="Type here..."
          />

          <label htmlFor="dropdownList" className="formTitle">
            Category
          </label>
          <select id="dropdownList" className="formDropdownSelect" required>
            <option value="" >
              Dropdown
            </option>
            {teamcategory.map((item) => (
              <option
                className="formDropdownList"
                key={item.id}
                {...register("teamcategory", { required: true })}
                value={`${item.name}`}
              >
                {item.name}
              </option>
            ))}
          </select>


          {item({
            name: 'tag',
            label: 'Category',
            renderContent: (props) => (
              <IonSelect multiple {...props}>
                {teamcategory.map((item) => (
                  <IonSelectOption key={item.id} value={item.name}>
                    {item.name}
                  </IonSelectOption>
                ))}
              </IonSelect>
            ),
          })}


          <label htmlFor="descriptionInput" className="formTitle">
            One sentence to describe your project:
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
          <input className="formSubmitButton" type="submit" value={"Next"} />
        </form> */}

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
