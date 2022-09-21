import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import "./css/TeamDetail.css";
import "./css/Common.css";
import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router";
import { TeamData, TeamMember } from "../model";

const TeamDetail: React.FC = () => {
  const [data, setData] = useState<TeamData[]>([]);
  const [tag, setTag] = useState<string[]>([]);
  const [teamMember, setTeamMember] = useState<TeamMember[]>([]);

  const router = useIonRouter();

  let match = useRouteMatch<{ id: string }>("/tab/team/:id");

  useEffect(() => {
    (async function () {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/team/${match?.params.id}`
      );
      const item = await res.json();

      setData(item.team);
      setTeamMember(item.teamMember);

      const tagArray: string[] = [];
      for (let i = 0; i < item.teamTag.length; i++) {
        tagArray.push(item.teamTag[i].name);
      }

      setTag(tagArray);
    })();
  }, []);

  async function joinTeam() {
    const localtoken = localStorage.getItem("token");
    await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/user/me/${match?.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${localtoken}`,
        },
        method: "POST",
      }
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tab/team" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {data.map((item) => {
          return (
            <div key={item.id} className="teamDetail">
              <img
                className="teamThumbnail"
                src={
                  item?.profilepic != null
                    ? `${process.env.REACT_APP_BACKEND_URL}/userUploadedFiles/${item.profilepic}`
                    : "StartieLogo.png"
                }
              />

              <h1 className="teamDetailTitle">{item.name}</h1>
              <p className="teamDetailLookingFor">Looking for:</p>
              <div className="lookingForTag">
                {tag.map((item) => {
                  return <span key={item}>{item}</span>;
                })}
              </div>

              <div>
                <p className="teamDescription">{item.description}</p>
              </div>
            </div>
          );
        })}
        <div className="teamDetailButtonContainer">
          <button className="chatButton">Chat</button>

          <button className="joinButton" onClick={joinTeam}>
            Join
          </button>
        </div>

        <div className="teamDetailMemeberContainer">
          {teamMember.map((item) => {
            return (
              <div className="teamDetailMemeber" key={item.id}>
                <img
                  className="teamDetailMemeberThumbnail"
                  src={
                    item?.profilepic != null
                      ? `${process.env.REACT_APP_BACKEND_URL}/userUploadedFiles/${item.profilepic}`
                      : "StartieLogo.png"
                  }
                />
                <div className="">
                  <p className="teamDetailMemeberUserName">{item.username}</p>
                  <p className="teamDetailMemeberUserDetail">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TeamDetail;
