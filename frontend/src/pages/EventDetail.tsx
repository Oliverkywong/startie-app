import {
  IonPage,
  IonHeader,
  IonImg,
  IonButton,
  IonBackButton,
  IonButtons,
  IonToolbar,
  useIonRouter,
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonContent,
  IonCardTitle,
} from "@ionic/react";
import "./css/Event.css";
import "./css/Common.css";
import React, { useEffect, useState } from "react";
import { useLocation, useRouteMatch } from "react-router-dom";
import eventimg from "../img/com1.png";

interface EventDetail {
  id: number;
  name: string;
  description: string;
  profilepic: string;
  starttime: string;
}

const EventDetail: React.FC = () => {
  const [data, setData] = useState<EventDetail[]>([]);
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

  async function joinEvent() {
    const localtoken = localStorage.getItem("token");
    await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/user/me/event/${match?.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${localtoken}`,
        },
        method: "POST",
      }
    );
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
            <IonCard key={item.id} className="eventDetail">
              <IonImg
                className="eventThumbnail"
                src={
                  item?.profilepic != null
                    ? `${process.env.REACT_APP_BACKEND_URL}/userUploadedFiles/${item.profilepic}`
                    : "StartieLogo.png"
                }
              />
              <IonCardTitle className="evenDetailTitle">
                {item.name}
              </IonCardTitle>
              <div className="event">
                <IonImg
                  src={
                    item?.profilepic != null
                      ? `${process.env.REACT_APP_BACKEND_URL}/userUploadedFiles/${item.profilepic}`
                      : "StartieLogo.png"
                  }
                  style={{ width: "10%" }}
                />
                <div className="eventinfo">
                  <IonLabel className="eventDescription">
                    {item.description}
                  </IonLabel>
                  <IonLabel>{item.starttime}</IonLabel>
                </div>
              </div>
            </IonCard>
          );
        })}
        <div className="detailButton">
          <IonButton onClick={joinEvent}>Join Competition</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default EventDetail;
