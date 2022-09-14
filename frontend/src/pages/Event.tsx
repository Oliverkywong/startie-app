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
  useIonViewWillEnter,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  useIonRouter,
  IonNavLink,
} from "@ionic/react";

import "./css/Event.css";

interface Event {
  id: number;
  name: string;
  description: string;
  profilepic: string;
  starttime: string;
}

const Event: React.FC = () => {
  const [data, setData] = useState<Event[]>([]);
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);
  const router = useIonRouter();

  useEffect(() => {
    (async function () {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/event`);
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
        <IonTitle className="title">商業比賽</IonTitle>
        <IonSearchbar
          placeholder="Search"
          onClick={() => {
            router.push("/search");
          }}
        />
      </IonHeader>
      <IonContent>
        <IonList>
          {data.map((item) => {
            return (
              <IonItem routerLink={`event/${item.id}`}>
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
                  <IonCardContent className="eventName">
                    {item.name}
                  </IonCardContent>
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
              </IonItem>
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
export default Event;
