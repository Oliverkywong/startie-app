import { IonImg, IonLabel, IonTitle, useIonRouter } from "@ionic/react";
import React from "react";
import { useRouteMatch } from "react-router";
import { Team } from "../../model";
import { API_ORIGIN } from "../../utils/api";

import "../css/Common.css";
import "../css/UserTeam.css";

export default function OtherUserTeams(props: { team: Team[] }) {
  const router = useIonRouter();
  return (
    <div>
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
                  ? `${API_ORIGIN}/userUploadedFiles/${team.profilepic}`
                  : "https://www.w3schools.com/howto/img_avatar.png"
              }
            />
            <div>
              <p>{team.name}</p>
            </div>

            <div>
              <p>{team.shortDescription}</p>
            </div>

            <div>
              <p>{team.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
