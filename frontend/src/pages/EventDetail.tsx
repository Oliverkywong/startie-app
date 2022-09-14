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
} from "@ionic/react";
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
      setData(item);
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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tab/event" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      {/* <div className="tag">
        Event Tag
        <span>View</span>
        <span>View</span>
      </div>
      <div>
        <p>「智創商機 Make IT HappenJ Hackathon大賽</p>
        <p>2019.10.10</p>
        <p>
          本計劃目標對象為對創科有熱誠、有志投身於創新
          科技業或初創青年，以提供培訓工作坊及透過
          HACKATHON極客大賽，推動他們積極思考及協助
          解決疫情下的營商問題，為推動社會經濟出一分
          力，並藉此向大眾推廣香港創科業及可持續發展目 標。
        </p>
      </div> */}
      <IonContent>
        {data.map((item) => {
          return (
            <IonCard key={item.id}>
              <IonItem>
                <IonImg
                  src={
                    item.profilepic === null
                      ? item.profilepic
                      : "../img/StartieLogo.png"
                  }
                />
              </IonItem>
              <IonCardContent className="eventName">{item.name}</IonCardContent>
              <div className="event">
                <IonImg src={item.profilepic} style={{ width: "10%" }} />
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
        <IonButton>Join</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default EventDetail;
