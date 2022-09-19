import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
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
            <IonCard key={item.id} className="teamDetail">
              <IonImg
                className="teamThumbnail"
                src={
                  item?.profilepic != null
                    ? `${process.env.REACT_APP_BACKEND_URL}/userUploadedFiles/${item.profilepic}`
                    : "StartieLogo.png"
                }
              />

              <IonCardTitle className="teamDetailTitle">
                {item.name}
              </IonCardTitle>
              <IonLabel className="teamDetailLookingFor">
                Looking for:{" "}
              </IonLabel>
              <div className="lookingForTag">
                {tag.map((item) => {
                  return <span key={item}>{item}</span>;
                })}
              </div>

              <div>
                <IonLabel className="teamDescription">
                  {item.description}
                </IonLabel>
              </div>
            </IonCard>
          );
        })}
        <div className="detailButton">
          <IonButton className="chatButton">Chat</IonButton>
          <IonButton className="joinButton">Join</IonButton>
        </div>

        <IonList>
          {teamMember.map((item) => {
            return (
              <div className="event" key={item.id}>
                <IonImg
                  src={
                    item?.profilepic != null
                      ? `${process.env.REACT_APP_BACKEND_URL}/userUploadedFiles/${item.profilepic}`
                      : "StartieLogo.png"
                  }
                  style={{ width: "10%" }}
                />
                <div className="eventinfo">
                  <IonLabel>{item.username}</IonLabel>
                  <IonLabel>{item.description}</IonLabel>
                </div>
              </div>
            );
          })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default TeamDetail;
