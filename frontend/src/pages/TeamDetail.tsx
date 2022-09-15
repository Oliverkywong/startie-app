import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router";
import team from "../img/team1.png";
import icon from "../img/tonystarkicon.png";

interface TeamDetail {
  id: number;
  name: string;
  description: string;
  profilepic: string;
}

const TeamDetail: React.FC = () => {
  const [data, setData] = useState<TeamDetail[]>([]);
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);
  const router = useIonRouter();

  let match = useRouteMatch<{ id: string }>("/tab/team/:id");

  useEffect(() => {
    (async function () {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/team/${match?.params.id}`
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
            <IonBackButton defaultHref="/tab/team" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
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
                </div>
              </div>
            </IonCard>
          );
        })}
        <IonButton>Join</IonButton>

        <IonList>
          <div className="event">
            <IonImg src={icon} style={{ width: "10%" }} />
            <div className="eventinfo">
              <IonLabel>Name</IonLabel>
              <IonLabel>Descrption</IonLabel>
            </div>
          </div>
          <div className="event">
            <IonImg src={icon} style={{ width: "10%" }} />
            <div className="eventinfo">
              <IonLabel>Name</IonLabel>
              <IonLabel>Descrption</IonLabel>
            </div>
          </div>
          <div className="event">
            <IonImg src={icon} style={{ width: "10%" }} />
            <div className="eventinfo">
              <IonLabel>Name</IonLabel>
              <IonLabel>Descrption</IonLabel>
            </div>
          </div>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default TeamDetail;
