import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
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
import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router";
import icon from "../img/tonystarkicon.png";

interface TeamDetail {
  id: number;
  name: string;
  description: string;
  profilepic: string;
}

interface TeamMember {
  id: number;
  username: string;
  profilepic: string;
  description: string;
}

const TeamDetail: React.FC = () => {
  const [data, setData] = useState<TeamDetail[]>([]);
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
      console.log(item.teamMember);
      setData(item.team);
      setTeamMember(item.teamMember);

      const tagArray: string[] = [];
      for (let i = 0; i < item.teamTag.length; i++) {
        tagArray.push(item.teamTag[i].name);
      }
      console.log(tagArray);
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
            <IonCard key={item.id}>
              <IonItem>
                <IonImg
                  src={
                    item?.profilepic != null
                      ? `${process.env.REACT_APP_BACKEND_URL}/userUploadedFiles/${item.profilepic}`
                      : "StartieLogo.png"
                  }
                />
              </IonItem>
              <IonCardContent className="eventName">{item.name}</IonCardContent>
              <IonLabel>Looking for: </IonLabel>
              <div className="tag">
                {tag.map((item) => {
                  return <span key={item}>{item}</span>;
                })}
              </div>
              <div className="event">
                <IonImg
                  src={
                    item?.profilepic != null
                      ? `${process.env.REACT_APP_BACKEND_URL}/userUploadedFiles/${item.profilepic}`
                      : "StartieLogo.png"
                  }
                  style={{ width: "10%" }}
                />
                <div className="eventinfo">
                  <IonLabel className="eventDescription">
                    {item.description}
                  </IonLabel>
                </div>
              </div>
            </IonCard>
          );
        })}
        <IonButton>Join Team</IonButton>

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
