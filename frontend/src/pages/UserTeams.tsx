import {
  IonContent,
  IonImg,
  IonItem,
  IonLabel,
  IonTitle,
  useIonRouter,
} from "@ionic/react";
import React from "react";
import "./css/Common.css";
import { Team } from "../model";

import "./css/Common.css";
import "./css/UserTeam.css";

export default function UserTeams(props: { team: Team[] }) {
  const router = useIonRouter();
  return (
    <IonContent>
      <div className="ProfileBackground">
        {props.team.map((team) => {
          console.log(team);
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
