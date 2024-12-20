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
import React, { useLayoutEffect, useState } from "react";
import logo from "../img/logo.png";
import "./css/Notification.css";
import { OneSignal } from "@awesome-cordova-plugins/onesignal";
import { Note } from "../model";
import { API_ORIGIN } from "../utils/api";
import moment from "moment";

const Notification: React.FC = () => {
  const [data, setData] = useState<Note[]>([]);

  // useLayoutEffect(() => {
  //   OneSignal.startInit('b2f7f966-d8cc-11e4-bed1-df8f05be55ba', '703322744261');

  //   OneSignal.inFocusDisplaying(OneSignal.OSInFocusDisplayOption.InAppAlert);

  //   OneSignal.handleNotificationReceived().subscribe(() => {
  //     // do something when notification is received
  //   });

  //   OneSignal.handleNotificationOpened().subscribe(() => {
  //     // do something when a notification is opened
  //   });

  //   OneSignal.endInit();
  // }, []);

  useLayoutEffect(() => {
    (async function () {
      const res = await fetch(`${API_ORIGIN}/user/me/note`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await res.json();
      console.log(result);

      setData(result);
    })();
  }, []);

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
        {data.map((item) => {
          return (
            <div key={item.id} className="note">
              <IonImg src={logo} style={{ width: "10%" }} />
              <div>
                <p>{item.content}</p>
                <p>Send at: {moment(item.created_at).format("DD MMM YYYY")}</p>
              </div>
            </div>
          );
        })}
      </IonContent>
    </IonPage>
  );
};

export default Notification;
