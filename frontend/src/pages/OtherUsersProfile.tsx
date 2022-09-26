import React, { useLayoutEffect, useState } from "react";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";

import {
  documentTextOutline,
  peopleCircleOutline,
  peopleOutline,
  statsChart,
} from "ionicons/icons";

import "./css/Common.css";
import "./css/Profile.css";
import UserStats from "./component/UserStats";
import { useRouteMatch } from "react-router";
import { EventInfo, UserInfo } from "../model";
import { API_ORIGIN } from "../utils/api";
import OtherUserTeams from "./component/OtherUserTeams";
import UserDetail from "./component/UserInfo";
import OtherUserEvents from "./component/OtherUserEvents";

const rootinfo = {
  id: 0,
  username: "dummy",
  profilepic: "rooticon.jpeg",
  shortDescription: "short",
  description: "testing",
  tags: ["dummytag", "dummytag2"],
  phonenumber: "1234567890",
  email: "123@gmail.com",
};

const OtherUserProfile: React.FC = () => {
  const [stat, setStat] = useState(false);
  const [info, setInfo] = useState(true);
  const [team, setTeam] = useState(false);
  const [event, setEvent] = useState(false);
  const [data, setData] = useState<UserInfo>(rootinfo);
  const [userBelongsTeam, setUserBelongsTeam] = useState([]);
  const [userBelongsEvent, setUserBelongsEvent] = React.useState<EventInfo[]>(
    []
  );
  const [sectorName, setSectorName] = useState<string[]>([]);
  const [skillName, setSkillName] = useState<string[]>([]);
  const [skillPoint, setSkillPoint] = useState<number[]>([]);
  const router = useIonRouter();

  let match = useRouteMatch<{ id: string }>("/tab/user/:id");

  useLayoutEffect(() => {
    (async function () {
      const res = await fetch(`${API_ORIGIN}/app/user/${match?.params.id}`);

      const data = await res.json();
      setData(data);

      const selfTeam = await fetch(
        `${API_ORIGIN}/user/team/${match?.params.id}`
      );
      const userTeam = await selfTeam.json();
      setUserBelongsTeam(userTeam);

      const userEvent = await fetch(
        `${API_ORIGIN}/user/event/${match?.params.id}`
      );
      const userEventJson = await userEvent.json();
      setUserBelongsEvent(userEventJson);

      const skillres = await fetch(`${API_ORIGIN}/skill/${match?.params.id}`);

      const skilldetails = await skillres.json();

      const sectorNameArray: string[] = [];
      for (let i = 0; i < skilldetails.detail.sector.length; i++) {
        sectorNameArray.push(skilldetails.detail.sector[i].name);
      }
      const skillNameArray: string[] = [];
      const skillPointArray: number[] = [];
      for (let i = 0; i < skilldetails.detail.skill.length; i++) {
        skillNameArray.push(skilldetails.detail.skill[i].name);
        skillPointArray.push(skilldetails.detail.skill[i].point);
      }

      setSectorName(sectorNameArray);
      setSkillName(skillNameArray);
      setSkillPoint(skillPointArray);
    })();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tab/home" />
            <IonTitle className="title">Profile</IonTitle>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="profile">
          <div className="profilepicContainer">
            <IonImg
              className="profilepic"
              src={
                data?.profilepic !== undefined || null
                  ? (data?.profilepic).slice(0, 4) === "data"
                    ? `${data.profilepic}`
                    : `${API_ORIGIN}/userUploadedFiles/${data.profilepic}`
                  : "https://www.w3schools.com/howto/img_avatar.png"
              }
            />
          </div>

          <IonLabel className="uresname">{data?.username}</IonLabel>

          <div className="profilebar">
            <div
              onClick={() => {
                setInfo(false);
                setStat(true);
                setTeam(false);
                setEvent(false);
              }}
            >
              <IonIcon icon={statsChart} />
              <IonLabel>Stats</IonLabel>
            </div>

            <div
              onClick={() => {
                setInfo(true);
                setStat(false);
                setTeam(false);
                setEvent(false);
              }}
            >
              <IonIcon icon={documentTextOutline} />
              <IonLabel>Details</IonLabel>
            </div>

            <div
              onClick={() => {
                setInfo(false);
                setStat(false);
                setTeam(true);
                setEvent(false);
              }}
            >
              <IonIcon icon={peopleOutline} />
              <IonLabel>Teams</IonLabel>
            </div>

            <div
              onClick={() => {
                setInfo(false);
                setStat(false);
                setTeam(false);
                setEvent(true);
              }}
            >
              <IonIcon icon={peopleCircleOutline} />
              <IonLabel>Events</IonLabel>
            </div>
          </div>
          {info && (
            <UserDetail
              shortDescription={data?.shortDescription}
              description={data?.description}
              phone={data?.phonenumber}
              email={data?.email}
            />
          )}
          {stat && (
            <UserStats
              sectorName={sectorName}
              skillName={skillName}
              skillPoint={skillPoint}
            />
          )}
          {team && <OtherUserTeams team={userBelongsTeam} />}
          {event && <OtherUserEvents event={userBelongsEvent} />}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default OtherUserProfile;
