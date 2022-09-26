import { IonImg, IonLabel, IonTitle, useIonRouter } from "@ionic/react";
import React from "react";
import { useRouteMatch } from "react-router";
import { EventInfo } from "../../model";
import { API_ORIGIN } from "../../utils/api";

import "../css/Common.css";
import "../css/UserTeam.css";

export default function UserEvents(props: { event: EventInfo[] }) {
  const router = useIonRouter();
  return (
    <div>
      {props.event.map((event) => {
        return (
          <div
            className="userTeam"
            key={event.id}
            onClick={() => router.push(`event/${event.id}`)}
          >
            <IonImg
              src={
                event?.event_profilepic != null
                  ? `${API_ORIGIN}/userUploadedFiles/${event.event_profilepic}`
                  : "https://www.w3schools.com/howto/img_avatar.png"
              }
            />
            <div>
              <IonTitle>{event.name}</IonTitle>
            </div>

            <div>
              <IonLabel>{event.description}</IonLabel>
            </div>
          </div>
        );
      })}
    </div>
  );
}
