import { IonImg, useIonRouter } from "@ionic/react";
import React from "react";
import { Team } from "../../model";
import { API_ORIGIN } from "../../utils/api";

import "../css/Common.css";
import "../css/UserTeam.css";

export default function OtherUserTeams(props: { team: Team[] }) {
  const router = useIonRouter();
  return (
    <>
      {props.team.map((team) => {
        return (
          <div
            className="userTeam"
            key={team.id}
            onClick={() => router.push(`/tab/team/${team.id}`)}
          >
            <IonImg
              src={
                team?.profilepic != null
                  ? `${API_ORIGIN}/userUploadedFiles/${team.profilepic}`
                  : "https://www.w3schools.com/howto/img_avatar.png"
              }
              style={{ width: "50px", height: "50px" }}
            />

            <div className="userTeamCaption">
              <p className="userTeamTitle">{team.name}</p>
              <span className="userTeamShortDescription">
                {team.shortDescription}
              </span>
            </div>
          </div>
        );
      })}
    </>
  );
}
