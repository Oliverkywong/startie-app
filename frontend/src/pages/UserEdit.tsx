import { IonPage, IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonImg, IonInput, IonItem, IonLabel, IonSelect, IonSelectOption, useIonRouter } from '@ionic/react'
import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import icon from '../img/tonystarkicon.png'

export default function UserEdit() {

  const router = useIonRouter();
  const { register, handleSubmit } = useForm();

  const [state, setState] = useState<any>(icon)

  const imghandle = (e: any) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.readyState === 2) {
        setState(reader.result)
      }
    }
    reader.readAsDataURL(e.target.files[0])
  }

  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/tab/profile" />
            </IonButtons>
            <IonTitle>User Edit</IonTitle>
          </IonToolbar>
        </IonHeader>
        <form
          onSubmit={handleSubmit(async (data) => {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("Description", data.Description);
            formData.append("icon", data.icon[0]);

            // await fetch(`${process.env.REACT_APP_BACKEND_URL}/useredit`, {
            //   method: "PATCH",
            //   headers: {
            //     'Authorization': `Bearer ${localtoken}`
            //   },
            //   body: formData,
            // })
            console.log(data);
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
          <input type="submit" />
        </form>
      </IonContent>
    </IonPage>
  )
}
