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

const Notification: React.FC = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async function () {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/me/note`);
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
              <IonItem>
              <div className="note">
                <div className="event">
                <IonImg src={logo} style={{ width: "10%" }} />
                <div className="eventinfo">
                <IonLabel>{item}</IonLabel>
                </div>
                </div>
                <IonLabel>time</IonLabel>
              </div>
              </IonItem>)}
          )}

          <IonItem>
            <div className="note">
              <div className="event">
                <IonImg src={logo} style={{ width: "10%" }} />
                <div className="eventinfo">
                  <IonLabel>Name</IonLabel>
                  <IonLabel>note</IonLabel>
                </div>
              </div>
              <IonLabel>time</IonLabel>
            </div>
          </IonItem>
        </IonList>
        <IonList>
          <IonItem>
            <div className="note">
              <div className="event">
                <IonImg src={logo} style={{ width: "10%" }} />
                <div className="eventinfo">
                  <IonLabel>Name</IonLabel>
                  <IonLabel>note</IonLabel>
                </div>
              </div>
              <IonLabel>time</IonLabel>
            </div>
          </IonItem>
        </IonList>
        <IonList>
          <IonItem>
            <div className="note">
              <div className="event">
                <IonImg src={logo} style={{ width: "10%" }} />
                <div className="eventinfo">
                  <IonLabel>Name</IonLabel>
                  <IonLabel>note</IonLabel>
                </div>
              </div>
              <IonLabel>time</IonLabel>
            </div>
          </IonItem>
        </IonList>
        <IonList>
          <IonItem>
            <div className="note">
              <div className="event">
                <IonImg src={logo} style={{ width: "10%" }} />
                <div className="eventinfo">
                  <IonLabel>Name</IonLabel>
                  <IonLabel>note</IonLabel>
                </div>
              </div>
              <IonLabel>time</IonLabel>
            </div>
          </IonItem>
        </IonList>
        <IonList>
          <IonItem>
            <div className="note">
              <div className="event">
                <IonImg src={logo} style={{ width: "10%" }} />
                <div className="eventinfo">
                  <IonLabel>Name</IonLabel>
                  <IonLabel>note</IonLabel>
                </div>
              </div>
              <IonLabel>time</IonLabel>
            </div>
          </IonItem>
        </IonList>
        <IonList>
          <IonItem>
            <div className="note">
              <div className="event">
                <IonImg src={logo} style={{ width: "10%" }} />
                <div className="eventinfo">
                  <IonLabel>Name</IonLabel>
                  <IonLabel>note</IonLabel>
                </div>
              </div>
              <IonLabel>time</IonLabel>
            </div>
          </IonItem>
        </IonList>
        <IonList>
          <IonItem>
            <div className="note">
              <div className="event">
                <IonImg src={logo} style={{ width: "10%" }} />
                <div className="eventinfo">
                  <IonLabel>Name</IonLabel>
                  <IonLabel>note</IonLabel>
                </div>
              </div>
              <IonLabel>time</IonLabel>
            </div>
          </IonItem>
        </IonList>
        <IonList>
          <IonItem>
            <div className="note">
              <div className="event">
                <IonImg src={logo} style={{ width: "10%" }} />
                <div className="eventinfo">
                  <IonLabel>Name</IonLabel>
                  <IonLabel>note</IonLabel>
                </div>
              </div>
              <IonLabel>time</IonLabel>
            </div>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Notification;
