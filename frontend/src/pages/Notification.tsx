import {
  IonPage,
  IonHeader,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonBackButton,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonImg,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import logo from "../img/logo.png";
import "./css/Notification.css";

interface Note {
  id: number;
  content: string;
  created_at: string;
}

const Notification: React.FC = () => {
  const [data, setData] = useState<Note[]>([]);

  useEffect(() => {
    (async function () {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/me/note`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const result = await res.json();
      console.log(result)
      setData(result);
    })()
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tab/home" />
          </IonButtons>
          <IonTitle>Notification</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {data.map((item) => {
            return (
              <IonItem key={item.id}>
                <div className="note">
                  <div className="event">
                    <IonImg src={logo} style={{ width: "10%" }} />
                    <div className="eventinfo">
                      <IonLabel>{item.content}</IonLabel>
                      <IonLabel>Send at: {item.created_at.slice(0, 10)}</IonLabel>
                    </div>
                  </div>
                </div>
              </IonItem>)
          })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Notification;
