import { IonContent, IonImg, IonItem, IonLabel, IonTitle } from "@ionic/react";
import React from "react";
import { Team } from "../model";

import "./css/Common.css";
import "./css/UserTeam.css";

export default function UserTeams(props: { team: Team[] }) {
  return (
    <IonContent>
      <div style={{ color: "#000" }}>
        {props.team.map((team) => {
          return (
            <div className="userTeam" key={team.id}>
              <IonImg
                src={
                  team?.profilepic != null
                    ? `${process.env.REACT_APP_BACKEND_URL}/userUploadedFiles/${team.profilepic}`
                    : "https://www.w3schools.com/howto/img_avatar.png"
                }
              ></IonImg>
              <div>
                <IonTitle>{team.name}</IonTitle>
              </div>

              <div>
                <IonLabel>{team.description}</IonLabel>
              </div>
            </div>
          );
        })}
      </div>
    </IonContent>
  );
}
