import { IonImg, useIonRouter } from "@ionic/react";
import React from "react";
import { EventInfo } from "../../model";
import { API_ORIGIN } from "../../utils/api";

import "../css/Common.css";
import "../css/UserTeam.css";

export default function UserEvents(props: { event: EventInfo[] }) {
  const router = useIonRouter();

  return (
    <>
      {props.event.map((event) => {
        if (props.event.length === 0) {
          <p>user haven't joined any event yet</p>;
          return;
        }

        return (
          <div
            className="userEvent"
            key={event.id}
            onClick={() => router.push(`event/${event.id}`)}
          >
            <IonImg
              src={
                event?.profilepic != null
                  ? `${API_ORIGIN}/userUploadedFiles/${event.profilepic}`
                  : "https://www.w3schools.com/howto/img_avatar.png"
              }
              style={{ width: "50px", height: "50px" }}
            />

            <div className="userTeamCaption">
              <p className="userTeamTitle">{event.name}</p>
              <span className="userTeamShortDescription">
                {event.shortDescription}
              </span>
            </div>
          </div>
        );
      })}
    </>
  );
}
