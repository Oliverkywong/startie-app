import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  useIonRouter,
  useIonToast,
} from "@ionic/react";
import "./css/TeamDetail.css";
import "./css/Common.css";
import React, { useLayoutEffect, useState } from "react";
import { useRouteMatch } from "react-router";
import { TeamData, TeamMember } from "../model";
import { API_ORIGIN } from "../utils/api";

const TeamDetail: React.FC = () => {
  const [present] = useIonToast();
  const [data, setData] = useState<TeamData[]>([]);
  const [tag, setTag] = useState<string[]>([]);
  const [teamMember, setTeamMember] = useState<TeamMember[]>([]);
  const [forceUpdate, setForceUpdate] = useState(0);

  const router = useIonRouter();

  let match = useRouteMatch<{ id: string }>("/tab/team/:id");

  useLayoutEffect(() => {
    (async function () {
      const res = await fetch(`${API_ORIGIN}/app/team/${match?.params.id}`);
      const item = await res.json();

      setData(item.team);
      setTeamMember(item.teamMember);

      const tagArray: string[] = [];
      for (let i = 0; i < item.teamTag.length; i++) {
        tagArray.push(item.teamTag[i].name);
      }

      setTag(tagArray);
    })();
  }, [forceUpdate]);

  async function joinTeam() {
    const localtoken = localStorage.getItem("token");
    const fetchResult = await fetch(
      `${API_ORIGIN}/user/me/team/${match?.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${localtoken}`,
        },
        method: "POST",
      }
    );
    const result = await fetchResult.json();

    setForceUpdate((i) => i + 1);

    present({
      message: result.msg,
      duration: 1500,
      position: "middle",
      cssClass: "backtoast",
    });
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
                  item?.profilepic !== null
                    ? (item?.profilepic).slice(0, 4) === "data"
                      ? `${item.profilepic}`
                      : `${API_ORIGIN}/userUploadedFiles/${item.profilepic}`
                    : "https://www.w3schools.com/howto/img_avatar.png"
                }
              />

              <h1 className="teamDetailTitle">{item.name}</h1>
              <p className="teamDescription">{item.shortDescription}</p>
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
          <button className="joinButton" onClick={joinTeam}>
            Join
          </button>
        </div>

        <div className="teamDetailMemeberContainer">
          {teamMember.map((item) => {
            return (
              <div
                className="teamDetailMemeber"
                key={item.id}
                onClick={() => {
                  router.push(`/tab/user/${item.id}`);
                }}
              >
                <img
                  className="teamDetailMemeberThumbnail"
                  src={
                    item?.profilepic !== null
                      ? (item?.profilepic).slice(0, 4) === "data"
                        ? `${item.profilepic}`
                        : `${API_ORIGIN}/userUploadedFiles/${item.profilepic}`
                      : "https://www.w3schools.com/howto/img_avatar.png"
                  }
                />
                <div className="teamDetailCaption">
                  <p className="teamDetailMemeberUserName">{item.username}</p>
                  <p className="teamDetailMemeberUserDetail">
                    {item.shortDescription}
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
