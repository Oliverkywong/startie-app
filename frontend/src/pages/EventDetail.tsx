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
import { API_ORIGIN } from "../utils/api";
import moment from "moment";

const EventDetail: React.FC = () => {
  const [present] = useIonToast();
  const [data, setData] = useState<EventInfo[]>([]);
  const [resultText, setResultText] = React.useState("");
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);
  const router = useIonRouter();

  let match = useRouteMatch<{ id: string }>("/tab/event/:id");

  useLayoutEffect(() => {
    (async function () {
      const res = await fetch(`${API_ORIGIN}/event/${match?.params.id}`);
      const item = await res.json();
      setData([item]);
    })();
  }, [setData]);

  async function joinEvent() {
    const localtoken = localStorage.getItem("token");
    const fetchResult = await fetch(
      `${API_ORIGIN}/user/me/event/${match?.params.id}`,
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
      position: "middle",
      cssClass: "backtoast",
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
                  item?.event_profilepic !== null
                    ? (item?.event_profilepic).slice(0, 4) === "data"
                      ? `${item.event_profilepic}`
                      : `${API_ORIGIN}/userUploadedFiles/${item.event_profilepic}`
                    : "https://www.w3schools.com/howto/img_avatar.png"
                }
              />
              <h1 className="evenDetailTitle">{item.event_name}</h1>
              <span className="eventDetailDescription">
                Short Description:{" "}
              </span>
              <p className="eventDetailDescription">{item.shortDescription}</p>
              <span className="eventDetailDescription">Description: </span>
              <p className="eventDetailDescription">{item.description}</p>

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
                  <p className="eventDate">
                    Due:{moment(item.starttime).format("DD MMM YYYY")}
                  </p>
                </div>
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
