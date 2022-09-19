import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonSearchbar,
  IonCard,
  IonCardContent,
  IonImg,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  useIonRouter,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonCardTitle,
} from "@ionic/react";

import "./css/Common.css";
import "./css/Event.css";
import { Event } from "../model";

const EventList: React.FC = () => {
  const [data, setData] = useState<Event[]>([]);
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);
  const router = useIonRouter();

  useEffect(() => {
    (async function () {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/event`);
      const result = await res.json();
      // console.log(result);
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
            <IonBackButton defaultHref="/tab/home" />
          </IonButtons>
          <IonTitle className="title">商業比賽</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar
            placeholder="Search"
            onClick={() => {
              router.push("/search");
            }}
          />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {data.map((item) => {
            return (
              <IonCard key={item.id} routerLink={`event/${item.id}`}>
                <IonImg
                  className="eventThumbnail"
                  src={
                    item?.profilepic != null
                      ? `${process.env.REACT_APP_BACKEND_URL}/userUploadedFiles/${item.profilepic}`
                      : "StartieLogo.png"
                  }
                />

                <IonCardTitle className="eventTitle">{item.name}</IonCardTitle>
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
        </IonList>
        <IonInfiniteScroll
          onIonInfinite={loadData}
          threshold="100px"
          disabled={isInfiniteDisabled}
        >
          <IonInfiniteScrollContent
            loadingSpinner="bubbles"
            loadingText="Loading more data..."
          ></IonInfiniteScrollContent>
        </IonInfiniteScroll>
      </IonContent>
    </IonPage>
  );
};
export default EventList;