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
import moment from "moment";

import "./css/Common.css";
import "./css/Event.css";
import { EventInfo } from "../model";
import { API_ORIGIN } from "../utils/api";

const EventList: React.FC = () => {
  const [data, setData] = useState<EventInfo[]>([]);
  const [fetchData, setFetchData] = useState<EventInfo[]>([]);
  const [i, setI] = useState(10);
  const router = useIonRouter();
  const isInfiniteDisabled = data.length >= fetchData.length;

  useEffect(() => {
    (async function () {
      const res = await fetch(`${API_ORIGIN}/app/event`);
      const result = await res.json();

      setData(result.events.slice(0, 10));
      setFetchData(result.events);
      setI(10);
    })();
  }, []);

  const pushData = () => {
    let sliceData = fetchData.slice(i, i + 10);
    setI((i) => i + 10);
    setData((data) => [...data, ...sliceData]);
  };

  const loadData = (ev: any) => {
    setTimeout(() => {
      pushData();
      ev.target.complete();
    }, 500);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tab/home" />
          </IonButtons>
          <IonTitle className="title">Event List</IonTitle>
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
                      item?.event_profilepic !== null
                        ? (item?.event_profilepic).slice(0, 4) === "data"
                          ? `${item.event_profilepic}`
                          : `${API_ORIGIN}/userUploadedFiles/${item.event_profilepic}`
                        : "https://www.w3schools.com/howto/img_avatar.png"
                    }
                    style={{ width: "10%", height: "10%" }}
                  />
                  <div>
                    <p className="eventDescription">{item.provider_name}</p>
                    <p className="eventDate">
                      Due:
                      {moment(item.starttime).format("DD MMM YYYY")}
                    </p>
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
