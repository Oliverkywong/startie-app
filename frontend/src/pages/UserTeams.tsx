import { IonContent, IonImg, useIonRouter } from "@ionic/react";
import React from "react";
import "./css/Common.css";
import { Team } from "../model";

import "./css/Common.css";
import "./css/UserTeam.css";

export default function UserTeams(props: { team: Team[] }) {
  const router = useIonRouter();
  return (
    <div className="ProfileBackground">
      {props.team.map((team) => {
        return (
          <div
            className="userTeam"
            key={team.id}
            onClick={() => router.push(`team/${team.id}`)}
          >
            <IonImg
              src={
                team?.profilepic != null
                  ? `${process.env.REACT_APP_BACKEND_URL}/userUploadedFiles/${team.profilepic}`
                  : "https://www.w3schools.com/howto/img_avatar.png"
              }
            ></IonImg>

            <p>{team.name}</p>

            <p>{team.description}</p>
          </div>
        );
      })}
    </div>
  );
}
