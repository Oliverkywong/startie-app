import React, { useLayoutEffect, useState } from "react";
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
import { EventInfo } from "../model";
import { API_ORIGIN } from "../utils/api";

const EventList: React.FC = () => {
  const [data, setData] = useState<EventInfo[]>([]);
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);
  const router = useIonRouter();

  useLayoutEffect(() => {
    (async function () {
      const res = await fetch(
        `${API_ORIGIN}/app/event/?searchcategory_id=3`
      );
      const result = await res.json();
      setData(result.events);
    })();
  }, []);

  const loadData = (ev: any) => {
    setTimeout(() => {
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
          <IonTitle className="title">Hackathon Event List</IonTitle>
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
                  router.push(`/tab/event/${item.id}`);
                }}
              >
                <img
                  className="eventThumbnail"
                  src={
                    item?.event_profilepic != null
                      ? `${API_ORIGIN}/userUploadedFiles/${item.event_profilepic}`
                      : "StartieLogo.png"
                  }
                />

                <p className="eventTitle">{item.event_name}</p>
                <p className="eventshortDescription">{item.shortDescription}</p>
                <div className="eventData">
                  <IonImg
                    src={
                      item?.event_provider_profile_pic != null
                        ? `${API_ORIGIN}/userUploadedFiles/${item.event_provider_profile_pic}`
                        : "StartieLogo.png"
                    }
                    style={{ width: "10%", height: "10%" }}
                  />
                  <div>
                    <p className="eventDescription">{item.provider_name}</p>
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
