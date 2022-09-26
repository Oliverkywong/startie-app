import { IonImg, useIonRouter } from "@ionic/react";
import React from "react";
import { useRouteMatch } from "react-router";
import { Team } from "../../model";
import { API_ORIGIN } from "../../utils/api";

import "../css/Common.css";
import "../css/UserTeam.css";

async function QuitTeam() {
  let match = useRouteMatch<{ id: string }>("/app/user/:id");

  const localtoken = localStorage.getItem("token");
  await fetch(`${API_ORIGIN}/user/me/team/${match?.params.id}`, {
    headers: {
      Authorization: `Bearer ${localtoken}`,
    },
    method: "DELETE",
  });
}

export default function UserTeams(props: { team: Team[] }) {
  const router = useIonRouter();
  return (
    <>
      {props.team.length === 0 ? (
        <p>Don't have team yet</p>
      ) : (
        props.team.map((team) => {
          return (
            <div
              className="selfUserTeam"
              key={team.id}
              onClick={() => router.push(`/tab/team/${team.id}`)}
            >
              <IonImg
                src={
                  team?.profilepic !== null
                    ? (team?.profilepic).slice(0, 4) === "data"
                      ? `${team.profilepic}`
                      : `${API_ORIGIN}/userUploadedFiles/${team.profilepic}`
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

              <div>
                <button className="quitButton" onClick={QuitTeam}>
                  Quit Team
                </button>
              </div>
            </div>
          );
        })
      )}
    </>
  );
}
