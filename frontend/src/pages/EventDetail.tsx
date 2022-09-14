import {
  IonPage,
  IonHeader,
  IonImg,
  IonButton,
  IonBackButton,
  IonButtons,
  IonToolbar,
  useIonRouter,
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
  const [data, setData] = useState<Event[]>([]);
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);
  const router = useIonRouter();

  let match = useRouteMatch<{ id: string }>("/tab/event/:id");

  useEffect(() => {
    (async function () {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/event/${match?.params.id}`
      );
      const result = await res.json();
      setData(result);
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
        <IonImg src={eventimg} style={{ width: "100%" }} />
      </IonHeader>
      <div className="tag">
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
      </div>
      <IonButton>Join</IonButton>
    </IonPage>
  );
};

export default EventDetail;
