import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonTitle,
  IonContent,
  IonImg,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  useIonRouter,
  IonToolbar,
  IonBackButton,
  IonButtons,
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
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/app/event/?category_id=2`
      );
      const result = await res.json();

      setData(result.events);
      console.log(result.events);
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
          <IonTitle className="title">Business Event List</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <div className="searchbarContainer">
            <input
              className="searchbar"
              placeholder="Search For Events"
              onClick={() => {
                router.push("/search");
              }}
            />
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="eventContainer">
          {data.map((item) => {
            return (
              <div
                className="eventinfo"
                key={item.id}
                onClick={() => {
                  router.push(`event/${item.id}`);
                }}
              >
                <img
                  className="eventThumbnail"
                  src={
                    item?.profilepic != null
                      ? `${process.env.REACT_APP_BACKEND_URL}/userUploadedFiles/${item.profilepic}`
                      : "StartieLogo.png"
                  }
                />

                <p className="eventTitle">{item.name}</p>
                <div className="eventData">
                  <IonImg
                    src={
                      item?.profilepic != null
                        ? `${process.env.REACT_APP_BACKEND_URL}/userUploadedFiles/${item.profilepic}`
                        : "StartieLogo.png"
                    }
                    style={{ width: "10%", height: "10%" }}
                  />
                  <div className="">
                    <p className="eventDescription">{item.description}</p>
                    <p className="eventDate">Due: {item.starttime}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
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
