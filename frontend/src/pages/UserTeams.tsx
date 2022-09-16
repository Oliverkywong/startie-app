import { IonImg, IonItem, IonLabel, IonTitle } from "@ionic/react";
import React from "react";
import { Team } from "../model";

import "./css/Common.css";
import "./css/UserTeam.css";

export default function UserTeams(props: { team: Team[] }) {
  return (
    <div style={{ color: "#000" }}>
      {props.team.map((team) => {
        return (
          <IonItem className="userTeam" key={team.id}>
            <div>
              <IonImg src={team.profilepic}></IonImg>
            </div>
            <div>
              <IonTitle>{team.name}</IonTitle>
            </div>

            <div>
              <IonLabel>{team.description}</IonLabel>
            </div>
          </IonItem>
        );
      })}
    </div>
  );
}
