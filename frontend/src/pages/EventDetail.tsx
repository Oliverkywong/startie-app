import {
  IonPage,
  IonHeader,
  IonImg,
  IonBackButton,
  IonButtons,
  IonToolbar,
  useIonRouter,
  IonContent,
} from "@ionic/react";
import { IonButton, useIonToast } from "@ionic/react";
import "./css/Event.css";
import "./css/EventDetail.css";
import "./css/Common.css";
import JoinEvent from "./JoinEvent";
import React, { useEffect, useState } from "react";
import { useLocation, useRouteMatch } from "react-router-dom";

interface EventDetail {
  id: number;
  name: string;
  description: string;
  profilepic: string;
  starttime: string;
}

const EventDetail: React.FC = () => {
  const [present] = useIonToast();
  const [data, setData] = useState<EventDetail[]>([]);
  const [resultBox, setResult] = React.useState(false);
  const [result, setResultText] = React.useState([]);
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);
  const router = useIonRouter();

  let match = useRouteMatch<{ id: string }>("/tab/event/:id");

  useEffect(() => {
    (async function () {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/event/${match?.params.id}`
      );
      const item = await res.json();
      setData([item]);
    })();
  }, []);

  const loadData = (ev: any) => {
    setTimeout(() => {
      console.log("Loaded data");
      ev.target.complete();
      if (data.length === 100) {
        setInfiniteDisabled(true);
      }
    }, 500);
  };

  const presentToast = (position: "top" | "middle" | "bottom") => {
    present({
      message: "Hello World!",
      duration: 1500,
      position: position,
    });
  };

  async function joinEvent() {
    const localtoken = localStorage.getItem("token");
    const fetchResult = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/user/me/event/${match?.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${localtoken}`,
        },
        method: "POST",
      }
    );
    const result = await fetchResult.json();
    if (result.result) {
      presentToast("top");
    }
    presentToast("bottom");
    console.log(result.result);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tab/event" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {data.map((item) => {
          return (
            <div key={item.id}>
              <IonImg
                className="eventThumbnail"
                src={
                  item?.profilepic != null
                    ? `${process.env.REACT_APP_BACKEND_URL}/userUploadedFiles/${item.profilepic}`
                    : "StartieLogo.png"
                }
              />
              <h1 className="evenDetailTitle">{item.name}</h1>

              <div>
                <p className="eventDetailDescription">{item.description}</p>
                <p className="eventDetailDate">Due date: {item.starttime}</p>
              </div>
            </div>
          );
        })}
        <div className="eventButtonContainer">
          <button className="eventDetailButton" onClick={joinEvent}>
            Join Competition
          </button>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default EventDetail;
