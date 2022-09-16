import { IonImg, IonItem, IonLabel } from "@ionic/react";
import React from "react";
import { Team } from "../model";

export default function UserTeams(props: { team: Team[] }) {
  return (
    <div style={{ color: "#000" }}>
      {props.team.map((team) => {
        return (
          <IonItem>
            <IonLabel>{team.name}</IonLabel>
            <IonLabel>{team.description}</IonLabel>
            <IonImg src={team.profilepic}></IonImg>
          </IonItem>
        );
      })}
    </div>
  );
}
