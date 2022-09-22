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
import { useIonToast } from "@ionic/react";
import "./css/Event.css";
import "./css/EventDetail.css";
import "./css/Common.css";
import React, { useLayoutEffect, useState } from "react";
import { EventInfo } from "../model";
import { useRouteMatch } from "react-router-dom";

const EventDetail: React.FC = () => {
  const [present] = useIonToast();
  const [data, setData] = useState<EventInfo[]>([]);
  const [resultText, setResultText] = React.useState("");
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);
  const router = useIonRouter();

  let match = useRouteMatch<{ id: string }>("/tab/event/:id");

  useLayoutEffect(() => {
    (async function () {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/event/${match?.params.id}`
      );
      const item = await res.json();
      setData([item]);
      console.log(item);
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

    present({
      message: result.msg,
      duration: 1500,
      position: "bottom",
    });
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
              <img
                className="eventThumbnail"
                src={
                  item?.event_profilepic != null
                    ? `${process.env.REACT_APP_BACKEND_URL}/userUploadedFiles/${item.event_profilepic}`
                    : "StartieLogo.png"
                }
              />
              <IonImg
                className="eventThumbnail"
                src={
                  item?.event_provider_profile_pic != null
                    ? `${process.env.REACT_APP_BACKEND_URL}/userUploadedFiles/${item.event_provider_profile_pic}`
                    : "StartieLogo.png"
                }
              />
              <h1 className="evenDetailTitle">{item.event_name}</h1>
              <p className="eventDetailDescription">{item.shortDescription}</p>

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
